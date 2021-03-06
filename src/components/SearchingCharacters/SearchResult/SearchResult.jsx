import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHeroes from '../../../hooks/useHeroes';
import CharacterSearchResult from './CharacterSearchResult/CharacterSearchResult';

const SearchResult = () => {
    const { heroesNames } = useParams();
    const { search, utils } = useHeroes();
    const [heroesSearchResult, setHeroesSearchResult] = useState([])
    const [errorSearch, setErrorSearch] = useState(false)
    const heroesNamesWithSpaces = heroesNames.split('-').join(' ').trim();

    useEffect(() => {
        const getData = async () => {
            setHeroesSearchResult([]);
            setErrorSearch(false);
            const request = await search.get(heroesNames.split('-').join('%20').toLowerCase());
            if (request.data.error) {
                setErrorSearch(true)
                setHeroesSearchResult([null])
            };
            if (request.data.results) setHeroesSearchResult(request.data.results)
            return request;
        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroesNames])

    return (
        <div className='row'>
            <h1 className="col-12 h3 text-center">Resultados para {heroesNamesWithSpaces}</h1>
            {!heroesSearchResult.length ?
                <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> :
                !errorSearch ?
                    <div className="row">
                        {heroesSearchResult.map(hero => {
                            return (
                                <CharacterSearchResult key={hero.id} hero={hero} />
                            )
                        })}
                    </div> :
                    <div className="col-12 alert alert-danger text-center" role="alert">
                        No hay resultados para esta b??squeda, intenta con otro h??roe!
                    </div>
            }
            {utils.heroAdded ?
                <div className="position-fixed bottom-0 end-0 p-4">
                    <div className="toast show showing align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">
                                {utils.heroAddedInfo} a??adido con ??xito al equipo.
                            </div>
                        </div>
                    </div>
                </div> :
                utils.errorHeroAdded ?
                    <div className='position-fixed bottom-0 end-0 p-4'>
                        <div className="toast show showing align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="d-flex">
                                <div className="toast-body">
                                    {utils.errorHeroAdded}
                                </div>
                            </div>
                        </div>
                    </div> :
                    null
            }
        </div>
    )
}

export default SearchResult;