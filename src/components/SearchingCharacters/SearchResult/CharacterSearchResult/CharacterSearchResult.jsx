import useHeroes from '../../../../hooks/useHeroes';

const CharacterSearchResult = ({ hero }) => {
    const { addToMyTeam } = useHeroes()

    const handleClick = () => {
        addToMyTeam(hero)
    }

    return (
        <div key={hero.id} className='col-12 col-sm-4 col-xl-3'>
            <div className="card m-1">
                <img src={hero.image.url} className="card-img-top img-fluid" alt={`Imagen de ${hero.name}`} />
                <div className="card-body">
                    <h5 className="card-title">{hero.name}</h5>
                    <button
                        id="aberBtn"
                        type="button"
                        onClick={handleClick}
                        className="btn btn-primary
                    ">Agregar a mi equipo</button>
                </div>
            </div>
        </div>
    )
}

export default CharacterSearchResult;