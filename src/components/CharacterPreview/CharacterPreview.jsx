import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import useHeroes from '../../hooks/useHeroes';
import AsideMenu from '../Global/AsideMenu/AsideMenu';
import SearchBar from '../Global/SearchBar/SearchBar';
import CharacterCardExtended from './CharacterCardExtended/CharacterCardExtended';

const CharacterPreview = () => {
    const { isLogged } = useUser();
    const { searchById } = useHeroes();
    const history = useHistory();
    const { characterId } = useParams();
    const [hero, setHero] = useState({});
    const [error, setError] = useState(false)
    useEffect(() => {
        if (!isLogged) history.push('/login')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged])
    useEffect(() => {
        const getData = async () => {
            setError(false)
            const request = await searchById.get(characterId)
            if (request.data.error) setError(true);
            if (request.data.response === 'success') setHero(request.data)
            return request;
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [characterId])

    return (
        <div className='min-vh-100 row m-0'>
            <div className='bg-light col-sm-3 p-0 m-0'>
                <AsideMenu />
            </div>
            <div className='bg-white col-sm-9'>
                <div className="row">
                    <div className='col-12'>
                        <SearchBar />
                        {hero.length ?
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> :
                            !error ?
                                <CharacterCardExtended hero={hero} /> :
                                <div className="col-12 alert alert-danger text-center" role="alert">
                                    No encontramos a este personaje, intenta con otro!
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterPreview;