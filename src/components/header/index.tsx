import { Link } from 'react-router-dom'
import logo from '../images/logo.svg'
import './styles.css'
import { ScheduleContext } from 'utils/context/ScheduleContext'
import { useContext } from 'react'
import AuthService from 'utils/services/auth.service'

const Header = () => {
    const { currentUser } = useContext(ScheduleContext)
    
    const handleLogout = () => {
        AuthService.logout();
        window.location.reload();
      };
    return (
        <header>
            <div className='container-logo'>
                <img style={{height:'3rem'}} src={logo} alt="Logomarca da Secomp" />
            </div>
            <div className='container-options'>
                <ul>
                    <span className="header-active-link">
                        { currentUser?(  
                            <li className="header-active-link">
                                <Link to={'#schedule-container-id'}>Inscreva-se</Link>
                            </li>
                        ) : 
                            <Link to={'/login'}>
                                Inscreva-se
                            </Link> 
                        }
                    </span>
                    <li className="header-active-link"><Link to={'#container-section-info'}> Sobre </Link></li>
                    <li className="header-active-link"><Link to={'#container-footer-contact'}> Contate-nos </Link></li>
                    { currentUser?(  
                        <li className="header-active-link" onClick={handleLogout}>
                            <Link to={'#'}>Log Out</Link>
                        </li>
                        ) : 
                            null
                        }
                </ul>
            </div>
        </header>
    );
}

export default Header;