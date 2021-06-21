import {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {AuthUserContext} from '../context/authUser';
import axios from 'axios';

const useUser = () => {
    const {loginToken} = useContext(AuthUserContext)
    const [utils, setUtils] = useState({
        loading: false,
        error: false
    })
    const history = useHistory()
    const loginUser = (email, password) => {
        setUtils({...utils, loading:true})
        axios.post('http://challenge-react.alkemy.org', {
            email,
            password
        })
        .then(resp => {
            setUtils({...utils, loading: false})
            localStorage.setItem('loginToken', resp.data.token)
            history.push('/home')
        })
        .catch(error => {
            setUtils({
                loading: false,
                error: true
            })
            setTimeout(() => {
                setUtils({...utils, error: false})
            }, 5000)
            
        })
    }
    
    return {
        isLogged: Boolean(loginToken),
        loginLoading: utils.loading,
        loginError: utils.error,
        loginUser
    }
}

export default useUser
