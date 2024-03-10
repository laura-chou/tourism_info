import express from 'express'
import { awake } from '../controllers/awake.js'

const router = express.Router()

router.get('/', awake)

export default router