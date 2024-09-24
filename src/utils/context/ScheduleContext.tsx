import { Day, ScheduleData } from "components/schedule/schedule-section"
import { createContext, useEffect, useState } from "react"
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import AuthService from 'utils/services/auth.service'

type ContextType = {
    scheduleData: ScheduleData[]
    error: boolean
    loading: boolean
    currentUser: { [key: string]: string } | null
    subscribedEvents: { i_status: boolean, timestamp: string }[]
    activeDay: Day
    loadScheduleData: () => void
    setScheduleData: Dispatch<SetStateAction<ScheduleData[]>>
    setLoading: Dispatch<SetStateAction<boolean>>
    setError: Dispatch<SetStateAction<boolean>>
    setSubscribedEvents: Dispatch<SetStateAction<{ i_status: boolean, timestamp: string }[]>>
    loadSubscribedEvents: () => void
    updateActiveDay: (day: Day) => void
    updateNextActiveDay: () => void
    updatePreviousActiveDay: () => void
}

interface Props extends Partial<ContextType> {
    children: ReactNode
  }

export const ScheduleContext = createContext<ContextType>({
    scheduleData: [],
    error: false,
    loading: true,
    currentUser: null,
    subscribedEvents: [],
    activeDay: 'segunda',
    loadScheduleData: () => undefined,
    setScheduleData: () => undefined,
    setLoading: () => undefined,
    setError: () => undefined,
    setSubscribedEvents: () => undefined,
    loadSubscribedEvents: () => undefined,
    updateActiveDay: () => undefined,
    updateNextActiveDay: () => undefined,
    updatePreviousActiveDay: () => undefined
  })

  const ScheduleContextProvider = ({ children, ...props }: Props) => {
    const [scheduleData, setScheduleData] = useState<ScheduleData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [subscribedEvents, setSubscribedEvents] = useState<{ i_status: boolean, timestamp: string }[]>([])
    const [activeDay, setActiveDay] = useState<Day>('segunda')

    const days: Day[] = ['segunda', 'terça', 'quarta', 'quinta', 'sexta']


  
    const loadScheduleData = async () => {
        await AuthService.getEvents()
            .then(response => {
                if(response.data.length > 0) {
                    return response.data
                }
                throw response
            })
            .then(data => {
                setScheduleData([...data])
            })
            .catch(error => {
                console.error("Error fetching data:", error)
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })

        await loadSubscribedEvents()
    }

    const loadSubscribedEvents = async () => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user)
            AuthService.getSubscribedEvents(user.id_token)
                .then((result) => {
                    if (result.data) {
                        setSubscribedEvents([...result.data])
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }

    const updateActiveDay = (day: Day) => {
        setActiveDay(day)
    }

    const updateNextActiveDay = () => {
        const activeDayIndex = days.findIndex((day: Day) => day === activeDay)
        activeDayIndex < days.length - 1 ? setActiveDay(days[activeDayIndex + 1]) : setActiveDay('segunda')
    }

    const updatePreviousActiveDay = () => {
        const activeDayIndex = days.findIndex((day: Day) => day === activeDay)
        activeDayIndex > 0 ? setActiveDay(days[activeDayIndex - 1]) : setActiveDay('sexta')
    }

    useEffect(() => {
        loadScheduleData()
    }, [])
  
    return (
      <ScheduleContext.Provider
        value={{
            scheduleData,
            loading,
            error,
            currentUser,
            subscribedEvents,
            activeDay,
            loadScheduleData,
            setScheduleData,
            setLoading,
            setError,
            setSubscribedEvents,
            loadSubscribedEvents,
            updateActiveDay,
            updateNextActiveDay,
            updatePreviousActiveDay,
          ...props,
        }}
      >
        {children}
      </ScheduleContext.Provider>
    )
  }
  
  export default ScheduleContextProvider