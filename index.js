import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import foodInfoRoutes from './routes/foodinfo.js'
import touristSpotsRoutes from './routes/touristspots.js'
import hotelInfoRoutes from './routes/hotelinfo.js'
import awakeRoutes from './routes/awake.js'

dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(cors({
  origin (origin, callback) {
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.ALLOW_CORS === 'true') {
        // 開發環境，允許
        callback(null, true)
      } else if (origin.includes('github')) {
        // 非開發環境，但是從 github 過來，允許
        callback(null, true)
      } else {
        // 不是開發也不是從 github 過來，拒絕
        callback(new Error('Not allowed'), false)
      }
    }
  },
  credentials: true
}))

app.use('/food-info', foodInfoRoutes)
app.use('/tourist-spots', touristSpotsRoutes)
app.use('/hotel-info', hotelInfoRoutes)
app.use('/awake', awakeRoutes)

app.listen(process.env.PORT, () => {
  console.log('已啟動')
  console.log('http://localhost:' + process.env.PORT)
})