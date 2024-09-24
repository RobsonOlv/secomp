import { useContext, useMemo, useState, TouchEvent, useRef } from 'react'
import Card from 'components/schedule/card'
import { Oval } from 'react-loader-spinner'
import { ScheduleContext } from 'utils/context/ScheduleContext'
import './styles.css'

export type Day = "segunda" | "terça" | "quarta" | "quinta" | "sexta"

interface ScheduleDayProps {
    day: Day
    isActive: boolean
    updateActiveDay: (day: Day) => void
}

export interface EventData {
    title: string,
    location: string,
    begin: string,
    end: string,
    speaker: string,
    type: 'Minicurso' | 'Talk' | 'Abertura' | 'GameDay' | 'Encerramento',
    description?: string,
    vinculo?: string,
    photo?: string,
    resume?: string,
    timestamp: string
    i_status: boolean
}

export interface ScheduleData {
    day: Day
    date: number
    events: EventData[]
}

const days: Day[] = ['segunda', 'terça', 'quarta', 'quinta', 'sexta']

const ScheduleDay = ({ day, isActive, updateActiveDay }: ScheduleDayProps) => {
    return (
        <div className={`schedule-section-day${isActive ? '-active': ''} day-option`} onClick={() => updateActiveDay(day)}>
            {day}
            {
                isActive && <div className='schedule-section-day-highlight'></div>
            }
        </div>
    )
}

const ScheduleSection = () => {
    const { scheduleData, loading, error, activeDay, updateActiveDay, updateNextActiveDay, updatePreviousActiveDay } = useContext(ScheduleContext)
    const [startSwapPos, setStartSwapPos] = useState(0)
    const ref = useRef<HTMLDivElement>(null)

    function handleTouchStart(e: TouchEvent) {
        setStartSwapPos(e.targetTouches[0].clientX);
    }

    function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
        const endpos = e.changedTouches[0].clientX
        if (startSwapPos - endpos > 150) {
            updateNextActiveDay();
        }
    
        if (startSwapPos - endpos < -150) {
            updatePreviousActiveDay();
        }
    }

    const filteredData: ScheduleData  = useMemo(() => {
        return scheduleData.find((element) => element.day === activeDay)!
    }, [scheduleData, activeDay])

    return loading ? (
        <Oval
        height={100}
        width={100}
        color="#460FE1"
        wrapperStyle={{ justifyContent: 'center', marginTop: '24px' }}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#F102AE"
        strokeWidth={2}
        strokeWidthSecondary={2}

        />
    ) : error ? (
        <p className="error-message">Erro: Houve algum problema interno com nosso banco de dados. Será resolvido em breve! =(</p>
    ) :(
        <div className="schedule-section-container">
            <div className="schedule-section-tab">
                <div className="schedule-section-tab-title">
                    {activeDay.charAt(0).toUpperCase() + activeDay.slice(1)}, {17 + days.findIndex((day: Day) => day === activeDay)} de julho
                </div>
            </div>
            <div className="schedule-section-tab-days">
                    {
                        days.map((day, index) => (
                            <span style={{display: 'flex'}} key={`schedule-day-${day + index}`}>
                                <ScheduleDay day={day} isActive={day === activeDay} updateActiveDay={updateActiveDay} />
                                {
                                    index < days.length - 1 && (
                                        <div className="schedule-section-day schedule-section-day-indent">
                                            -
                                        </div>
                                    )
                                }
                            </span>
                        ))
                    }
            </div>
            <div 
            className="schedule-section-grid"
            onTouchStart={touchStartEvent => { handleTouchStart(touchStartEvent)}}
            onTouchEnd={(touchMoveEvent) => handleTouchEnd(touchMoveEvent)}
            style={{ position: 'relative' }}
            ref={ref}
            >
                {
                    filteredData?.events.length > 0 ? 
                        filteredData?.events.map((event, index) => (
                            <Card {...event} key={`schedule-card-${filteredData.day}-${index}`} />
                        ))
                    : (
                        <div className="empty-box">
                            <img width={200} src="https://visualpharm.com/assets/981/Empty%20Box-595b40b65ba036ed117d43e8.svg" alt="caixa vazia" />
                            <p className="empty-schedule">
                                A programação do dia será divulgada em breve!
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ScheduleSection