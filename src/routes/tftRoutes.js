import express from 'express'

function getTFTRoutes() {
  const router = express.Router()
  router.get('/v1/summoner/:summonerName', handleGetSummonerInfo)
  router.get('/v1/match/history/:matchId', handleGetMatchDetail)
  router.get('/v1/matches/:summonerName', handleGetMatchesForSummoner)
  return router
}

export {getTFTRoutes}