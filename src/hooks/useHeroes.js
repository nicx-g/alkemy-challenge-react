import {useContext, useEffect} from 'react';
import {HeroesContext} from '../context/heroes';
import axios from 'axios';

const useHeroes = () => {
    const {myTeam, utils, averageStats, setMyTeam, setUtils, setAverageStats} = useContext(HeroesContext)
    
    const getAveragePowerStats = (myTeam) => {
        //Sumar todos los powerstats
        let arrayPowerstats = []
        myTeam.map(item => {
            for (const property in item.powerstats){
                let index = arrayPowerstats.findIndex(powerstat => powerstat.name === property)
                if(arrayPowerstats.find(powerstat => powerstat.name === property)){
                    arrayPowerstats[index].value += item.powerstats[property] !== "null" ? parseInt(item.powerstats[property]) : 0
                } else {
                    arrayPowerstats.push({
                        name: property,
                        value: item.powerstats[property] !== "null" ? parseInt(item.powerstats[property]) : 0
                    })
                }
            }
        })
        //Traducir a español (ponele) y promediar con la cantidad de miembros en el team
        let averagePowerstats = []
        arrayPowerstats.map(item => {
            for(const property in item){
                if(item[property] === 'intelligence') item[property] = 'inteligencia'
                if(item[property] === 'strength') item[property] = 'fuerza'
                if(item[property] === 'speed') item[property] = 'velocidad'
                if(item[property] === 'durability') item[property] = 'durabilidad'
                if(item[property] === 'power') item[property] = 'poder'
                if(item[property] === 'combat') item[property] = 'combate'
                if(property === "value"){
                    item[property] = Number((item[property] / myTeam.length).toFixed(2))
                    averagePowerstats.push({
                        name: item['name'],
                        value: item['value']
                    })
                }
            }
        })
        //Ordenando de mayor a menor 
        let averagePowerstatsSorted = averagePowerstats.sort((a, b) => {return b.value - a.value})
        return averagePowerstatsSorted;
    }

    const getAverageHeightWeight = (myTeam) => {
        // Sumar pesos y alturas    
        let heights = []
        let weights = []
        myTeam.map(item => {
            heights.push(parseInt(item.appearance.height[1].replace(' cm', '')))
            weights.push(parseInt(item.appearance.weight[1].replace(' kg', '')))
        })
        let averageHeightWeight = {
            height: `${(heights.reduce((acc, value) => {return acc + value}, 0) / myTeam.length).toFixed(2)} cm`,
            weight: `${(weights.reduce((acc, value) => {return acc + value}, 0) / myTeam.length).toFixed(2)} kg`
        }
        return averageHeightWeight
    }
    
    const getAlignment = (myTeam) => {
        let newObject = {
            good: 0,
            bad: 0,
        }
        myTeam.map(item => {
            if(item.biography.alignment === 'good') newObject.good += 1;
            if(item.biography.alignment === 'bad') newObject.bad += 1;
        })
        return newObject;
    }
    
    useEffect(() => {
        const averagePowerstats = getAveragePowerStats(myTeam);
        const averageHeightWeitght = getAverageHeightWeight(myTeam);
        setAverageStats({
            powerstats: averagePowerstats,
            appearance: averageHeightWeitght
        });
    }, [myTeam])
    
    const search = axios.create({
        baseURL: 'https://superheroapi.com/api.php/4304535416272042/search',
        "mode" : 'no-cors',
        "Headers" : {
            'Access-Control-Allow-Origin':'*'
        }
    })

    const addToMyTeam = (hero) => {
        const alignment = getAlignment(myTeam)
        setUtils({
            heroAdded: false,
            errorHeroAdded: false
        })
        if(myTeam.find(item => item.id === hero.id)){
            setUtils({...utils, errorHeroAdded: 'Ya agregaste este héroe! prueba con otro'})
        } else if(hero.biography.alignment === 'neutral'){
            setUtils({...utils, errorHeroAdded: 'El equipo debe contener 3 miembros con orientación buena y 3 miembros con orientación mala. Este personaje es un neutral'})
        } else if(alignment.good >= 3 && hero.biography.alignment === 'good'){
            setUtils({...utils, errorHeroAdded: 'El equipo no puede tener más de 3 héroes!'})
        } else if(alignment.bad >= 3 && hero.biography.alignment === 'bad'){
            setUtils({...utils, errorHeroAdded: 'El equipo no puede tener más de 3 villanos!'})
        } else {
            setMyTeam([
                ...myTeam,
                hero
            ])
            setUtils({...utils, heroAdded: true})
        }
        setTimeout(() => {
            setUtils({
                heroAdded: false,
                errorHeroAdded: false
            })
        }, 3000)
    }

    const removeHero = (hero) => {
        const newTeam = myTeam.filter(item => item.id !== hero.id)    
        setMyTeam(newTeam)
    }
    
    
    return {
        search,
        myTeam,
        averageStats,
        utils,
        addToMyTeam,
        removeHero
    }
}

export default useHeroes
