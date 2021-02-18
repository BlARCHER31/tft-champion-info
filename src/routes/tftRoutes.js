import express from 'express'
import riotApiClient from '../services/riotApiClient'

function getChampionRoutes() {
  const router = express.Router()
  router.get('/v1/champion/info/:champion', handleGetChampionInfo)
  router.get('/v1/champion/skins/:champion', handleGetChampionSkins)
  return router
}

async function handleGetChampionInfo(req, res) {
    const champion = req.params.champion
    try {
        let championInfo = await riotApiClient.getChampionInfo(champion)
        res.send(championInfo)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

async function handleGetChampionSkins(req, res) {
    const champion = req.params.champion
    try {
        let championSkins = await riotApiClient.getChampionSkins(champion)
        res.send(championSkins)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

export {getChampionRoutes, handleGetChampionInfo, handleGetChampionSkins}