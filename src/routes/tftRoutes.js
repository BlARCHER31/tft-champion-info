import express from 'express'
import riotApiClient from '../services/riotApiClient'

function getChampionRoutes() {
  const router = express.Router()
  router.get('/v1/tft/champion/info/:champion', handleChampionInfo)
  return router
}

async function handleChampionInfo(req, res) {
    let championInfo = await riotApiClient.getChampionJsonData()
    
    try {
        for (const property in championInfo.data) {
            if(property === req.params.champion){
            return console.log(`${property}: ${championInfo.data[property].blurb}`)
            } 
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
}


export {getChampionRoutes}