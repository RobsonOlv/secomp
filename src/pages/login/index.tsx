import { useState  } from "react"
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { testCPF } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import AuthService from 'utils/services/auth.service'
import './styles.css'

const validate = (values: any) => {
    const errors: any = {};

    if (!values.username) {
        errors.username = 'Campo obrigatório';
    } else if (values.username.length < 11 || !testCPF(values.username)) {
        errors.username = 'CPF Inválido'
    }

    if (!values.password) {
        errors.password = 'Campo obrigatório';
    }

    return errors;
};

function Login() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [loginError, setLoginError] = useState('')

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: (values) => {
            doLogin(values);
        },
    });
    
    const doLogin = (values: any) => {
        setIsLoading(true)
        AuthService
            .login(values)
            .then(() => {
                setIsLoading(false)
                navigate('/#schedule-container-id')
            })
            .catch((err) => {
                if (err.response?.data === "The username or password is incorrect") {
                    setLoginError("O usuário ou senha informados estão incorretos.")
                } else {
                    setLoginError('Ocorreu um erro com o login, tente novamente mais tarde.')
                }
                setIsLoading(false)
            })
    }
    
    return(
        <form className='loginContainer' onSubmit={formik.handleSubmit}>
            {
                isLoading ? (
                <div className='Loginform-loading'>
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
                    <p>Carregando...</p>
                </div>)
                    : <div className='Loginform'>
                        <div className='titulo'>
                            <h1>Secomp UFPE</h1>
                            <h2>Sistema de inscrição</h2>
                        </div>

                        <div className='inputs-container'>
                            <label>CPF</label>
                            <input
                                placeholder='12345678910'
                                name='username'
                                inputMode='decimal'
                                maxLength={11}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                            />
                            {
                                formik.touched.username && formik.errors.username
                                    ? <span>{formik.errors.username}</span>
                                    : null
                            }
                        </div>

                        <div className='inputs-container last'>
                            <label>Senha</label>
                            <input
                                name='password'
                                type='password'
                                placeholder='*****'
                                className='input-field'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            {
                                formik.touched.password && formik.errors.password
                                    ? <span>{formik.errors.password}</span>
                                    : null
                            }
                        </div>

                        <div className='buttons-container'>
                            <Link id="subscribe-redirect" to={'/cadastro'}>
                                Não possuo cadastro
                            </Link>
                            <div className='button-container'>
                                <button id='login-button' type='submit' className='filled-button'>Login</button>
                            </div>
                        </div>

                        {
                            loginError
                                ? <div className='login-error'>
                                    {loginError}
                                </div>
                                : null
                        }
                    </div>
            }
        </form>
    );
}

export default Login;