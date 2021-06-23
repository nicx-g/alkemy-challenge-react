import { Link } from 'react-router-dom';

const CharacterCard = ({hero}) => {
    const handleClick = () => {
        alert('eliminado')
    }
    
    return (
        <div key={hero.id} className='col-12 col-sm-6 col-lg-4'>
            <div className="card m-2 bg-light">
                <img src={hero.image.url} className="card-img-top" alt={`Foto de ${hero.name}`} />
                <div className="card-body">
                    <h5 className="card-title">{hero.name}</h5>
                    <ul className="list-group list-group-flush">
                        <li className='list-group-item'>Inteligencia: {hero.powerstats.intelligence !== 'null' ? hero.powerstats.intelligence : 'Desconocido'}</li>
                        <li className='list-group-item'>Combate: {hero.powerstats.combat !== 'null' ? hero.powerstats.combat : 'Desconocido'}</li>
                        <li className='list-group-item'>Durabilidad: {hero.powerstats.durability !== 'null' ? hero.powerstats.durability : 'Desconocido'}</li>
                        <li className='list-group-item'>Velocidad: {hero.powerstats.speed !== 'null' ? hero.powerstats.speed : 'Desconocido'}</li>
                        <li className='list-group-item'>Fuerza: {hero.powerstats.strength !== 'null' ? hero.powerstats.strength : 'Desconocido'}</li>
                        <li className='list-group-item'>Poder: {hero.powerstats.power !== 'null' ? hero.powerstats.power : 'Desconocido'}</li>
                    </ul>
                    <div className='my-2'>
                        <Link to={`/character/${hero.id}`} className="btn btn-primary">Ver detalle</Link>
                        <button className="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#deleteCharacter">Eliminar</button>

                        <div className="modal fade" id="deleteCharacter" tabIndex="-1" aria-labelledby="deleteCharacterLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="deleteCharacterLabel">Eliminar del equipo</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <h5>¿Estás seguro de querer eliminar a {hero.name} del equipo?</h5>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                        <button onClick={handleClick} type="button" className="btn btn-danger">Sí, eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterCard;