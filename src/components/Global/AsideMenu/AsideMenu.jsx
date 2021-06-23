import { Link } from 'react-router-dom';
import useHeroes from '../../../hooks/useHeroes';

const AsideMenu = () => {
    const {averageStats, myTeam} = useHeroes()
    return (
        <div className='w-100 row row-cols-1'>
            <div className='col-12 text-center my-4'>
                <Link className='btn btn-outline-dark' to='/home'>Mi equipo</Link>
            </div>
            <div className="col accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Powerstats del equipo
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body d-flex flex-column">
                            {myTeam.length !== 0 ?
                                averageStats?.powerstats?.map(item => (
                                    <span>{item.name.replace(/^\w/, c => c.toUpperCase())}: {item.value}</span>
                                )) :
                                <span>No tenemos datos por el momento, agrega algún héroe!</span>
                            }
                            {}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Pesos y altura del equipo
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body d-flex flex-column">
                            {myTeam.length !== 0 ?
                                <>
                                    <span>Altura: {averageStats.appearance.height}</span>
                                    <span>Peso: {averageStats.appearance.weight}</span>
                                </> : 
                                <span>No tenemos datos por el momento, agrega algún héroe!</span>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AsideMenu;