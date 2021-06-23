import useHeroes from '../../../hooks/useHeroes';
import CharacterCard from './CharacterCard/CharacterCard';

const MyTeam = () => {
    const {myTeam} = useHeroes();

    return (
        <div className="row">
            <div className="col-12 my-2">
                <h1 className="h2">Mi equipo</h1>
            </div>
            {myTeam.length === 0 ?
                <div className="alert alert-warning" role="alert">
                    <p>Por ahora no hay nadie en el equipo :(</p>
                    <p>Prueba con buscar algún héroe en la barra de búsqueda!</p>
                </div> :
                myTeam.map(hero => (
                    <CharacterCard key={hero.id} hero={hero} />
                ))
            }
        </div>
    )
}

export default MyTeam;