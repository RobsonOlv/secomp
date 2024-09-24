import palestrasIcon from 'components/images/palestras_icon.svg'
import minicursosIcon from 'components/images/minicursos_icon.svg'
import aboutImage from 'components/images/about-image.svg'
import bolotasImg from 'components/images/bloobs-img/bolotas.svg'
import './styles.css';
import project from 'utils/project.json'

const projectAbout: { title: string, brief: string} = JSON.parse(JSON.stringify(project)).about
const About = () => {
    return (
        <>
        <div className='bolotasImg' style={{ backgroundImage: `url(${bolotasImg})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'right' }} />
        <section className='container-section-info' id='container-section-info'>
            <div className='content-section' id="section-info-container">
                <div className='content-section-text'>
                    <h2>{projectAbout.title}</h2>
                    <p className='brief-description'>{projectAbout.brief}</p>
                </div>
                <div className='content-section-info'>
                    <img src={aboutImage} alt="Imagem de evento organizado pelo grupo PET Informática" />
                    <ul>
                        <li>
                            <div className='content-icon'>
                                <img src={palestrasIcon} alt="Ícone com uma pessoa falando" />
                                <p>Talks</p>
                            </div>
                            <p className='section-info-description'>Apresentações orais realizadas por especialistas em um determinado campo de estudo. Elas oferecem uma oportunidade para as pessoas participantes adquirirem conhecimentos e insights valiosos sobre tópicos específicos.</p>
                        </li>
                        <li className='after'>
                            <div className='content-icon'>
                                <img src={minicursosIcon} alt="Ícone com uma pessoa ensinando" />
                                <p>Minicursos</p>
                            </div>
                            <p className='section-info-description'>Sessões de aprendizado mais práticas e interativas, com longa duração. Eles oferecem a chance de explorar um tópico específico com maior profundidade e adquirir habilidades práticas em uma área específica.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        </>
    );
}

export default About;