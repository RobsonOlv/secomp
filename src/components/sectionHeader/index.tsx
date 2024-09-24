import { Link } from 'react-router-dom'
import Header from 'components/header'
import image from 'components/images/header-image.svg'
import downScroll from 'components/images/down_scroll.svg'
import './styles.css'

const SectionHeader = () => {
    return (
        <section className='container-sectionHeader'>
            <Header/>
            <div className='content-sectionHeader'>
                <div className='sectionHeader-title'>
                    <h1>Semana da Computação da UFPE</h1>
                    <p>De 17 a 21 Julho, no Centro de Informática</p>
                    <div className="buttons-control-header">
                        <button className='button-header button-inscreva-se'>
                            <Link to={'/login'}>
                                Inscreva-se
                            </Link>
                        </button>
                        <a href="#schedule-container-id"><button className='button-header button-programacao'>Programação</button></a>
                    </div>
                </div>
                <img className="sectionHeader-headerImg" src={image} alt="Imagem de formas geométricas" />
            </div>
            <div className="downscroll">
                <a href="#section-info-container" className='buttonScroll'><img src={downScroll} alt="Flecha de scroll" /></a>
            </div>
        </section>
    );
}

export default SectionHeader;