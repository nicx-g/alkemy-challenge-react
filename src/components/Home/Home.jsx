import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import AsideMenu from '../Global/AsideMenu/AsideMenu';
import SearchBar from '../Global/SearchBar/SearchBar';
import MyTeam from './MyTeam/MyTeam';

const Home = () => {
    const { isLogged } = useUser();
    const history = useHistory();
    useEffect(() => {
        if (!isLogged) history.push('/login')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged])

    return (
        <div className='min-vh-100 row m-0'>
            <div className='bg-light col-sm-3 p-0 m-0'>
                <AsideMenu />
            </div>
            <div className='bg-white col-sm-9'>
                <div className="row">
                    <div className='col-12'>
                        <SearchBar />
                        <MyTeam/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;