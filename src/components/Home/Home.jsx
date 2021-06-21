import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import useUser from '../../hooks/useUser';

const Home = () => {
    const {isLogged} = useUser();
    const history = useHistory();
    useEffect(() => {
        if(!isLogged) history.push('/login')
    }, [isLogged])
    
    return (
        <div>hola</div>
    )
}

export default Home;