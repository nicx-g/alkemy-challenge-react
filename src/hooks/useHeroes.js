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
    
    
    useEffect(() => {
        const averagePowerstats = getAveragePowerStats(myTeam)
        const averageHeightWeitght = getAverageHeightWeight(myTeam)
        setAverageStats({
            powerstats: averagePowerstats,
            appearance: averageHeightWeitght
        })
    }, [myTeam])
    
    const search = axios.create({
        baseURL: 'https://superheroapi.com/api.php/4304535416272042/search',
        "mode" : 'no-cors',
        "Headers" : {
            'Access-Control-Allow-Origin':'*'
        }
    })

    const addToMyTeam = (hero) => {
        setUtils({
            heroAdded: false,
            errorHeroAdded: false
        })
        setMyTeam([
            ...myTeam,
            hero
        ])
        setUtils({...utils, heroAdded: true})
        setTimeout(() => {
            setUtils({
                heroAdded: false,
                errorHeroAdded: false
            })
        }, 2000)
    }
    
    return {
        search,
        myTeam,
        averageStats,
        utils,
        addToMyTeam
    }
}

export default useHeroes
