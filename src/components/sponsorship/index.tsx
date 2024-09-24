import { ReactSVG } from "react-svg";
import project from 'utils/project.json'
import bolotasImg from 'components/images/bloobs-img/bolotas.svg'
import './styles.css';


interface Logo {
    page: string
    url: string
}
interface SponsorshipSection {
    title: string,
    logos: Logo[]
}

function isValidURL(string: string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

const data: SponsorshipSection[] = JSON.parse(JSON.stringify(project)).sponsor
const Sponsorship = () => {
    return (
        <>
            <div className="sp-container">
                <div>
                    {
                        data.map((section: SponsorshipSection) => (
                            <div key={`section-${section.title}`} className="sp-section">
                                <h3>{section.title}</h3>
                                <div className="sp-section-logos">
                                    {
                                        section.logos.map((logo, index) => (
                                            <a key={`section-${section.title}-${index}`} href={logo.page} style={{width: "100%"}}>
                                                {
                                                    logo.url ? 
                                                        isValidURL(logo.url) ?
                                                        <div className="sp-section-logo"><img src={logo.url} alt="logo de instituição membro da realização" /></div>
                                                        :
                                                        <ReactSVG key={`${section.title}-logo-${index}`} src={`icons/${logo.url}`} /> 
                                                    : <div  key={`${section.title}-logo-${index}`} className="sp-section-empty-logo">You here</div>
                                                }
                                            </a>
                                        )
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='bolotasImg' style={{ backgroundImage: `url(${bolotasImg})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'right', transform: 'rotate(180deg)' }} />
        </>
    );
}

export default Sponsorship;