import express from 'express'
import { getHotelInfo } from '../controllers/hotelinfo.js'

const router = express.Router()

router.get('/', getHotelInfo)
router.get('/:region/:town', getHotelInfo)

export default router