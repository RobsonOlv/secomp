import { useContext } from 'react';
import { ScheduleContext } from 'utils/context/ScheduleContext';
import ScheduleSection from './schedule-section';
import SquaresSvg from 'components/images/squares-img/squares.svg'
import downScroll from 'components/images/down_scroll.svg'
import './styles.css'

const Schedule = () => {
    const { updateNextActiveDay, updatePreviousActiveDay } = useContext(ScheduleContext)
    return (
        <div className="schedule-container">
            <header className="schedule-header">
                <div className="squares-image" style={{ backgroundImage: `url(${SquaresSvg})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'right', transform: 'rotate(180deg)' }} />
                <div className="schedule-box" id="schedule-container-id">
                    <h1 className="schedule-title">Inscrição</h1>
                    <div className="schedule-description-container">
                        <p className="schedule-description-text">
                            Inscreva-se abaixo nos talks e minicursos de sua escolha!
                            <br></br>
                        </p>
                        <ol>
                            <strong>Infos</strong>
                            <li>Inscrições com choque de horário serão recusadas;</li>
                            <li>
                                <span style={{ textDecoration: 'line-through' }}>A inscrição está <strong>limitado</strong> à: 2 minicursos e 4 talks; ou  1 minicursos e 8 talks; ou 0 minicursos e 12 talks;</span>
                                {' '}<strong style={{ color: 'rgba(251, 0, 0, 1)' }}>(Limitação removida!)</strong>
                            </li>
                            <li>Será obrigatória a apresentação de documento oficial com foto;</li>
                            <li>Para agilizar a comprovação da sua inscrição, é interessante que leve seu celular para fazer login em nosso site;</li>
                            <li>
                                Os talks e minicursos irão ocorrer no CIn-UFPE;
                                <ol style={{ border: 'none' }}>
                                    <li>Talks serão no Anfiteatro</li>
                                    <li>Minicursos serão no laboratório de computadores (Grad 1)</li>
                                </ol>
                            </li>
                        </ol>
                        <p className='schedule-description-postscriptum'>
                            P.S.: Se um talk estiver lotado, não se preocupe! Além de haver lista de espera, as vagas restantes no auditório - pós 10 minutos do início - poderão ser ocupadas por quem estiver no local.
                        </p>
                    </div>
                </div>
            </header>
            <div className="schedule-items-container">
                <div className="schedule-items-container-carousel-container" style={{ justifyContent: 'flex-start' }}>
                    <div className="schedule-items-container-carousel"
                        onClick={() => updatePreviousActiveDay()} ><img src={downScroll} style={{ rotate: '90deg' }} alt="Flecha de scroll" /></div>
                </div>
                <ScheduleSection />
                <div className="schedule-items-container-carousel-container">
                    <div className="schedule-items-container-carousel"
                        onClick={() => updateNextActiveDay()}><img src={downScroll} style={{ rotate: '275deg' }} alt="Flecha de scroll" /></div>
                </div>
            </div>
            <div className="squares-image-bottom" style={{ backgroundImage: `url(${SquaresSvg})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'right' }} />
        </div>
    );
}

export default Schedule;