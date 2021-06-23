import { Link } from 'react-router-dom';
import useHeroes from '../../../../hooks/useHeroes';

const CharacterCard = ({hero}) => {
    const {removeHero} = useHeroes();
    
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
                        <button className="btn btn-danger m-2" onClick={() => removeHero(hero)}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterCard;