import { useContext, useEffect, useState } from 'react'
import AuthService from 'utils/services/auth.service'
import { EventData } from '../schedule-section'
import emptyPersonLogo from 'components/images/empty-person.png'
import { useNavigate } from 'react-router-dom'
import { ScheduleContext } from 'utils/context/ScheduleContext'
import { Oval } from 'react-loader-spinner'
import { confirmAlert } from 'react-confirm-alert';
import './styles.css'
import './alert.css'

const Card = ({ title, begin, end,  speaker, vinculo = 'Engenheira de Software na Softex', type='Talk', photo = '', resume = '', timestamp, i_status}: EventData) => {
    const navigate = useNavigate()
    const escapedType = ['Abertura', 'GameDay', 'Encerramento'].includes(type)
    const { currentUser, subscribedEvents, loadSubscribedEvents } = useContext(ScheduleContext)
    const isSubscribed = subscribedEvents.findIndex((subEvent) => subEvent.timestamp === timestamp)
    const subStatus = isSubscribed >= 0 ? subscribedEvents[isSubscribed].i_status : false
    const [subscribeButtomPos, setSubscribeButtomPos] = useState(-40)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const isEnd = true

    const dateBegin = new Date(begin)
    const dateEnd = new Date(end)
    const hourBegin = ("0" + dateBegin.getHours()).slice(-2) + (dateBegin.getMinutes() > 0 ? `: ${dateBegin.getMinutes()}` : '')
    const hourEnd = ("0" + dateEnd.getHours()).slice(-2) + (dateEnd.getMinutes() ? `: ${dateEnd.getMinutes()}` : '')
    const speakerInfo = `${speaker}${vinculo ? `,\n ${vinculo}` : ''}`
    const actionText = 
    isSubscribed >= 0 ? 
        subStatus ? {
            value: 'Inscrito',
            background: '#2aec54',
            button: {
                value: 'Desinscrever-se',
                background: '#9d0000',
                text: '#FDF8F5'
            }
        } : {
            value: 'Espera',
            background: '#FFE800',
            button: {
                value: 'Sair da fila',
                background: '#9d0000',
                text: '#FDF8F5',
            }
        } : !i_status ? {
            value: 'Lotado',
            background: '#FB0000',
            button: {
                value: 'Lista de espera',
                background: '#FFE800',
                text: '#000000',
            }
        } : null

    
    
    useEffect(() => {
        if (!error) return
        setTimeout(() => {
            setError('')
        }, 5000)
    }, [error])

    const handleSubscribe = async (isSubscribed: number) => {

        setLoading(true)
        if (isEnd) {
            setError('O Evento foi encerrado!')
            setLoading(false)
            return
        }
        if (currentUser) {
            const isAuth = AuthService.authVerify(currentUser.access_token)
            if(!isAuth) {
                AuthService.logout()
                navigate('/login')
            }

            if (isSubscribed >= 0) {
                await AuthService.unsubscribe({ idToken: currentUser.id_token, data: [timestamp] })
                .catch((err) => {
                    if (err?.response?.data.message === 'Unauthorized') {
                        AuthService.logout()
                        navigate('/login')
                    } else {
                        setError(err.message)
                    }
                }) 
            } else {
                await AuthService.subscribe({ idToken: currentUser.id_token, data: [timestamp] })
                .catch((err) => {
                    if (err.response?.data?.message === 'Unauthorized') {
                        AuthService.logout()
                        navigate('/login')
                    } else {
                        setError(err.response?.data)
                    }
                    console.error(err.response?.data)
                })     
            }

            loadSubscribedEvents()

        } else {
            navigate('/login')
        }
        setLoading(false)
    }

    const submit = (isSubscribed: number, text: string) => {
        if (document) document.body.style.overflowY = 'hidden'
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='alert-container' >
                        <div className='alert-card'>
                            <h1 className='alert-title'>Tem certeza?</h1>
                            <p>Você quer <span className='alert-action'>{text}</span> do evento?</p>
                            <button className='alert-button alert-close' onClick={() => {
                                if (document) document.body.style.overflowY = 'scroll'
                                onClose()
                            }}>Não</button>
                            <button
                            className='alert-button alert-confirm'
                            onClick={() => {
                                if (document) document.body.style.overflowY = 'scroll'
                                handleSubscribe(isSubscribed);
                                onClose()
                            }}
                            >
                            Sim
                            </button>
                        </div>
                    </div>
                )
            },
            title: 'Confirm to submit',
            message: `Você tem certeza que quer ${text}?`,
            buttons: [
              {
                label: 'Sim',
                onClick: () => handleSubscribe(isSubscribed)
              },
              {
                label: 'Não',
                onClick: () => {}
              }
            ],
            closeOnClickOutside: true,
            onClickOutside: () => {},
          });
    }


    return (
        <div className="card" onMouseOver={() => setSubscribeButtomPos(0)} onMouseLeave={() => setSubscribeButtomPos(-40)}>
            {
                speaker || escapedType ? (
                    <div className="card-avatar">
                        <img className={`card-avatar-background ${photo ? '' : 'avatar-empty-image'}`} src={photo ? photo : emptyPersonLogo} alt="foto do palestrante" />
                    </div>
                ) :
                null
            }
            <div className="card-container">
                <div className="card-type-container">
                    <p className={`card-type ${type === 'Minicurso' ? 'minicourse' : 'talk'}`} style={{ border: escapedType ? '1px solid #460FE1': '', background: escapedType ? '#460FE1': '', color: escapedType ? '#FDF8F5': '' }}>
                        {escapedType ? 'Evento' : type}
                    </p>
                    <p className="card-hour">
                        {`${hourBegin}h  ${escapedType ? '' : `- ${hourEnd}h`}`}
                    </p>
                </div>
                <div className="card-title" style={{ display: escapedType ? 'block' : '' }}>
                    {title}
                </div>
                <div className="card-text">
                    <p className="card-speaker-info">
                        {speakerInfo}
                    </p>
                </div>
            </div>
            {
                actionText ? (
                    <div className="card-action" style={{ backgroundColor: actionText.background }}>
                        <h1>{ actionText.value }</h1>
                    </div>
                ) : null
            }
            {
                type !== 'Encerramento' ? 
                    type === 'GameDay' ?
                    (
                        <>
                            <div onClick={() => window.open('/docs/aws.pdf', '_blank')} className="card-subscribe-mobile" style={{ bottom: '40px',backgroundColor: '#a256f8', color: '#FDF8F5'  }}>
                                Requisitos
                            </div>
                            <div onClick={() => window.open('/docs/aws.pdf', '_blank')} className="card-subscribe" style={{  bottom: subscribeButtomPos === 0 ? 40 : -40, backgroundColor: '#a256f8', color: '#FDF8F5'  }}>
                                Requisitos
                            </div>
                            <div onClick={() => handleSubscribe(isSubscribed)} className="card-subscribe-mobile" style={{ backgroundColor: actionText ? actionText.button.background : '#2ACEB1', color: actionText?.button.text  }}>
                                { actionText ? actionText.button.value : 'Inscrever-se' }
                            </div>
                            <div onClick={() => handleSubscribe(isSubscribed)} className="card-subscribe" style={{ bottom: subscribeButtomPos, backgroundColor: actionText ? actionText.button.background : '#2ACEB1', color: actionText?.button.text  }}>
                                { actionText ? actionText.button.value : 'Inscrever-se' }
                            </div>
                            {
                                loading && (
                                    <Oval
                                    height={100}
                                    width={100}
                                    color="#460FE1"
                                    wrapperStyle={{ position: 'absolute', justifyContent: 'center', display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#F102AE"
                                    strokeWidth={2}
                                    strokeWidthSecondary={2}
                            
                                    />
                                )
                            }
                            <div className="error-container" style={{ opacity: error ? '1' : '0' }}>
                                <p>{error}</p>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <div  onClick={() => isSubscribed >= 0 ? submit(isSubscribed, actionText?.button.value || '') : handleSubscribe(isSubscribed)}  className="card-subscribe-mobile" style={{ backgroundColor: actionText ? actionText.button.background : '#2ACEB1', color: actionText?.button.text  }}>
                                { actionText ? actionText.button.value : 'Inscrever-se' }
                            </div>
                            <div onClick={() => isSubscribed >= 0 ? submit(isSubscribed, actionText?.button.value || '') : handleSubscribe(isSubscribed)} 
                            className="card-subscribe" style={{ bottom: subscribeButtomPos, backgroundColor: actionText ? actionText.button.background : '#2ACEB1', color: actionText?.button.text  }}>
                                { actionText ? actionText.button.value : 'Inscrever-se' }
                            </div>
                            {
                                loading && (
                                    <Oval
                                    height={100}
                                    width={100}
                                    color="#460FE1"
                                    wrapperStyle={{ position: 'absolute', justifyContent: 'center', display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#F102AE"
                                    strokeWidth={2}
                                    strokeWidthSecondary={2}
                            
                                    />
                                )
                            }
                            <div className="error-container" style={{ opacity: error ? '1' : '0' }}>
                                <p>{error}</p>
                            </div>
                        </>
                    )
                : null
            }
        </div>
    );
}

export default Card;