import express from 'express'
import { getFoodInfo } from '../controllers/foodinfo.js'

const router = express.Router()

router.get('/', getFoodInfo)
router.get('/:region/:town', getFoodInfo)

export default router