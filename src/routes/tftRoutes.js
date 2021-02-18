import express from 'express'
import riotApiClient from '../services/riotApiClient'

function getChampionRoutes() {
  const router = express.Router()
  router.get('/v1/champion/info/:champion', handleChampionInfo)
  return router
}

async function handleChampionInfo(req, res) {
    
    
    try {
        let championInfo = await riotApiClient.getChampionJsonData(req.params.champion)
        res.send(championInfo)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}


export {getChampionRoutes}