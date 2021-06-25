const CharacterCardExtended = ({ hero }) => {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{hero?.name}</h5>
                        <div className="card-body">
                            <p className="m-1">Altura: <small className="text-muted">{hero.appearance?.height[1]}</small></p>
                            <p className="m-1">Peso: <small className="text-muted">{hero.appearance?.weight[1]}</small></p>
                            <p className='m-1'>Alias: <small className="text-muted">{hero.biography?.aliases.map((item, index) => {
                                if (index === hero.biography.aliases.length - 1) {
                                    return ` ${item} `
                                } else {
                                    return ` ${item} / `
                                }
                            }
                            )}
                            </small>
                            </p>
                            <p className="m-1">Color de ojos: <small className="text-muted">{hero.appearance?.["eye-color"]}</small></p>
                            <p className="m-1">Color de cabello: <small className="text-muted">{hero.appearance?.["hair-color"]}</small></p>
                            <p className="m-1">Lugar de trabajo: <small className="text-muted">{hero.work?.base}</small></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-4">
                    <img src={hero.image?.url} className="img-fluid rounded-start" alt={`Imagen de ${hero.name}`} />
                </div>
            </div>
        </div>
    )
}
export default CharacterCardExtended