import express from 'express'
import { getChampionRoutes } from './tftRoutes'

function getRoutes() {
  const router = express.Router()
  router.use('/tft', getChampionRoutes())
  return router
}

export { getRoutes }
