import express from 'express'
import dotenv from 'dotenv'
import router from './routes'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()

if (!process.env.MONGODB_URI) {
  throw new Error(
    'No mongodb uri informed, please inform it in enviroment variables'
  )
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const PORT = process.env.PORT || 3333
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT, () => console.log(`> Server listen on port ${PORT}`))
