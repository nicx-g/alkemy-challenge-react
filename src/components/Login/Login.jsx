import SignupForm from './SignupForm/SignupForm';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import useUser from '../../hooks/useUser';

const Login = () => {
    const {isLogged} = useUser();
    const history = useHistory();
    useEffect(() => {
        if(isLogged) history.push('/home')
    }, [isLogged])

    return(
        <div className="min-vh-100 container d-flex justify-content-center align-items-center">
            <div className="bg-light p-2 p-sm-4 w-auto rounded d-flex flex-column justify-content-center align-items-center">
                <img src="https://campus.alkemy.org/logos/d_logo_small.png" alt="logo alkemy" />
                <h1 className='fs-5 mb-2 mb-sm-4 w-75 text-center'>¿Listo para crear tu propio equipo de superhéroes? Inicia sesión!</h1>
                <div>
                    <SignupForm/>
                </div>
            </div>
        </div>
    )
}

export default Login;