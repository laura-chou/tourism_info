import express from 'express'
import { getTouristSpots } from '../controllers/touristspots.js'

const router = express.Router()

router.get('/', getTouristSpots)
router.get('/:region/:town', getTouristSpots)

export default router