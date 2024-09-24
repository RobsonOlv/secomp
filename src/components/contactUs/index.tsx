import './styles.css'
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai'

const About = () => {
    return (
        <footer>
            <div className='about-gradient'>
                <div className='container-footer-contact' id='container-footer-contact'>
                    <div className='contact-titles'>
                        <p>Ainda tem alguma dúvida?</p>
                        <h3>Fale conosco!</h3>
                    </div>
                    <div>
                        <div className='contact-icons'>
                            <a href="mailto:secomp@cin.ufpe.br">
                                <AiOutlineMail />
                                <p>secomp@cin.ufpe.br</p>
                            </a>
                        </div>
                        <div className='contact-icons'>
                            <a href="https://www.instagram.com/secompufpe/" target='_blank'>
                                <AiOutlineInstagram />
                                <p>secompufpe</p>
                            </a>
                        </div>
                    </div>
                    <div className='contact-adress'>
                        Av. Jornalista Aníbal Fernandes, s/n – Cidade Universitária, <br /> Recife – PE,50740-560
                    </div>
                </div>
                <div className='container-footer-map'>
                    <iframe src="https://www.google.com/maps/d/u/6/embed?mid=1Nm3HU6XBNQPkbbhajvqwE5OmzbM-bQum&ehbc=2E312F" height="100%" width='100%'></iframe>
                </div>
            </div>
        </footer>
    );
}

export default About;