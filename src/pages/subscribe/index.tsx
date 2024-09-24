import AuthService from 'utils/services/auth.service'
import { useEffect, useState  } from "react"
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { useFormik } from 'formik'
import { testCPF } from '../../utils/utils'
import './styles.css'

const validate = (values: any) => {
    const errors: any = {};
    if (!values.nome) {
      errors.nome = 'Campo obrigatório';
    }
  
    if (!values.sobrenome) {
      errors.sobrenome = 'Campo obrigatório';
    }
  
    if (!values.email) {
      errors.email = 'Campo obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Formato de email inválido';
    }

    if(!values.emailValidation) {
        errors.emailValidation = 'Campo obrigatório'
    } else if(values.email !== values.emailValidation) {
        errors.emailValidation = 'Os emails não conferem'
    }

    if (!values.cpf) {
        errors.cpf = 'Campo obrigatório';
    } else if (values.cpf.length < 11 || !testCPF(values.cpf)) {
        errors.cpf = 'CPF Inválido'
    }

    if (!values.vinculo || values.vinculo === 'empty') {
        errors.vinculo = 'Campo obrigatório';
    }

    if (!values.genero || values.genero === 'empty') {
        errors.genero = 'Campo obrigatório';
    }

    return errors;
};

function Subscribe() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [subscriptionError, setSubscriptionError] = useState('')
    const isEnd = true

    const formik = useFormik({
        initialValues: {
            email: '',
            emailValidation: '',
            cpf: '',
            vinculo: '',
            nome: '',
            sobrenome: '',
            promocionais: false,
            termos: true,
            genero: ''
        },
        validate,
        onSubmit: (values) => {
            doSubscribe(values);
        },
    });

    const doSubscribe = (values: any) => {
        setIsLoading(true)
        if(isEnd) {
            setSubscriptionError('O Evento já foi encerrado!')
            setIsLoading(false)
            return
        }
        AuthService.register(values)
            .then((e) => {
                setIsSubscribed(true)
                setIsLoading(false)
            })
            .catch((err) => {
                if (err.response?.data?.toLowerCase().includes('this username already exists')) {
                    setSubscriptionError('Já existe um cadastro informado com este CPF/e-mail.')
                } else {
                    setSubscriptionError('Ocorreu um erro com a inscrição, tente novamente mais tarde.')
                }
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (!isSubscribed) return
        const interval = setInterval(() => {
            navigate('/login')
          }, 8000);

        return () =>  clearInterval(interval)
    }, [navigate, isSubscribed])
    

    return (
        <div className='subscribeContainer'>
            <div className='Subscribeform'>
                { 
                    isLoading ? <div className='form-group'>Carregando...</div>
                        : isSubscribed ? 
                            <div>
                                <div className='register-successful-title inter bold blue'>
                                    Obrigado pelo cadastro na SECOMP UFPE 2023! <br/><br/>As <span className="register-successful-highlight">instruções</span> sobre como se inscrever nas atividades serão enviadas <span className="register-successful-highlight">por e-mail</span>.
                                </div>
                                <div className="register-successful-container">
                                    <Oval
                                        height={36}
                                        width={36}
                                        color="#460FE1"
                                        wrapperStyle={{ justifyContent: 'center', marginTop: '24px' }}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#460FE1"
                                        strokeWidth={2}
                                        strokeWidthSecondary={2}

                                        />
                                    <p className="register-successful-return-message">Retornando para o Login</p>
                                </div>
                            </div>
                            : <form onSubmit={formik.handleSubmit}>
                                <div className='form-group'>
                                    <h1>Cadastrar</h1>
                                    <div className='nome-container'>
                                        <label>Nome *</label>
                                        <input
                                            name='nome'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.nome}
                                        />
                                        {
                                            formik.touched.nome && formik.errors.nome
                                                ? <span>{formik.errors.nome}</span>
                                                : null
                                        }
                                    </div>

                                    <div className='nome-container'>
                                    <label>Sobrenome *</label>
                                    <input
                                        name='sobrenome'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.sobrenome}
                                    />
                                        {
                                            formik.touched.sobrenome && formik.errors.sobrenome
                                                ? <span>{formik.errors.sobrenome}</span>
                                                : null
                                        }
                                    </div>

                                    <div id='campos-email-cpf'>
                                        <div className='emailecpf-container email-container'>
                                            <label>E-mail *</label>
                                            <span style={{ color: '#000000' }}>A <strong>senha</strong> para login será enviada para o email cadastrado!</span>
                                            <input
                                                    name='email'
                                                    placeholder='exemplo@mail.com'
                                                    type='email'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email}
                                            />
                                            {
                                                formik.touched.email && formik.errors.email
                                                    ? <span>{formik.errors.email}</span>
                                                    : null
                                            }
                                            <input
                                                    name='emailValidation'
                                                    placeholder='confirme seu email'
                                                    type='email'
                                                    autoComplete="new-password"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.emailValidation}
                                                    style={{ marginTop: '8px' }}
                                            />
                                            {
                                                formik.touched.emailValidation && formik.errors.emailValidation
                                                    ? <span>{formik.errors.emailValidation}</span>
                                                    : null
                                            }
                                        </div>
                                        <div className='emailecpf-container cpf-container'>
                                            <label>CPF *</label>
                                            <input
                                                name='cpf'
                                                id='cpfinput'
                                                placeholder='123245678910'
                                                inputMode='decimal'
                                                maxLength={11}
                                                value={formik.values.cpf}
                                                onChange={(formik.handleChange)}
                                                onBlur={formik.handleBlur}
                                            />
                                            {
                                                formik.touched.cpf && formik.errors.cpf
                                                    ? <span>{formik.errors.cpf}</span>
                                                    : null
                                            }
                                        </div>
                                    </div>

                                    <div id='drop-down-container'>
                                        <div className='drop-down-list'>
                                            <label>Gênero *</label>
                                            <select
                                                name="genero"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.genero}
                                            >
                                                <option selected value="empty"></option>
                                                <option value="mulher-cis">Mulher Cisgênero</option>
                                                <option value="mulher-trans">Mulher Transgênero</option>
                                                <option value="homem-cis">Homem Cisgênero</option>
                                                <option value="homem-trans">Homem Transgênero</option>
                                                <option value="pessoa-nb">Pessoa Não-Binária</option>
                                                <option value="pessoa-agen">Pessoa Agênera</option>
                                                <option value="genero-fluido">Gênero-fluido</option>
                                                <option value="vazio">Prefiro não informar</option>
                                            </select>
                                            {
                                                formik.touched.genero && formik.errors.genero
                                                    ? <span>{formik.errors.genero}</span>
                                                    : null
                                            }
                                        </div>
                                        <div className='drop-down-list'>
                                            <label>Vinculo UFPE*</label>
                                            <select
                                                name="vinculo"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.vinculo}
                                                required
                                            >
                                                <option value="empty" selected></option>
                                                <option value="valcann">Valcann</option>
                                                <option value="beyond">Beyond Co</option>
                                                <option value="neurotech">Neurotech</option>
                                                <option value="eds">EDS</option>
                                                <option value="encora">Incognia</option>
                                                <option value="tempest">Tempest</option>
                                                <option value="encora">Encora</option>
                                                <option value="acqio" label="Acqio">Acqio</option>
                                                <option value="cin-UFPE">CIn-UFPE</option>
                                                <option value="ufpe">UFPE</option>
                                                <option value="outros">Outros</option>
                                            </select>
                                            {
                                                formik.touched.vinculo && formik.errors.vinculo
                                                    ? <span>{formik.errors.vinculo}</span>
                                                    : null
                                            }
                                        </div>
                                    </div>

                                    <div className='promocionais-container'>
                                        <input
                                            id="promocionais"
                                            name='promocionais'
                                            type='checkbox'
                                            checked={formik.values.promocionais}
                                            onChange={formik.handleChange}
                                        />
                                        <label>Gostaria de receber e-mails da Secomp UFPE e seus patrocinadores.</label>
                                    </div>
                                    <div className='termos-container'>
                                        <label>
                                            Ao me cadastrar declaro ter lido e aceito os <a href='https://drive.google.com/file/d/15BP6eVASKrJJ_2GZ7PsD-D03n6qMkkF0/view?usp=sharing'>termos de uso da plataforma de inscrições</a> da SECOMP 2023.
                                        </label>
                                    </div>

                                    <div className='button-container'>
                                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='filled-button'>Cadastrar</button>
                                    </div>
                                    {
                                        subscriptionError
                                            ? <div className='subs-error'>
                                                {subscriptionError}
                                              </div>
                                            : null
                                    }
                                </div>
                              </form>
                }
            </div>
        </div>
    );
}

export default Subscribe;
