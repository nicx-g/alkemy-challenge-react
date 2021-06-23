import {createContext, useState} from 'react';

export const HeroesContext = createContext();

const HeroesProvider = ({children}) => {
    const [myTeam, setMyTeam] = useState([]);
    const [utils, setUtils] = useState({
        heroAdded: false,
        errorHeroAdded: false
    })
    const [averageStats, setAverageStats] = useState([]);
    return(
        <HeroesContext.Provider value={{
            myTeam,
            utils,
            averageStats,
            setMyTeam,
            setUtils,
            setAverageStats
        }}>
            {children}
        </HeroesContext.Provider>
    )
};

export default HeroesProvider;
