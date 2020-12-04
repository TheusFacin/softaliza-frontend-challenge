import express from 'express'
import dotenv from 'dotenv'
import router from './routes'

dotenv.config()

const PORT = process.env.PORT || 3333
const app = express()

app.use(express.json())

app.use(router)

app.listen(PORT, () => console.log(`> Server listen on port ${PORT}`))
