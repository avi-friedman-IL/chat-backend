// import dotenv from 'dotenv'
// dotenv.config()
import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

import { logger } from './services/logger.service.js'
import { setupSocketAPI } from './services/socket.service.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { chatRoutes } from './api/chat/chat.routes.js'

const app = express()
const server = http.createServer(app)

app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.resolve('public')))
} else {
   const corsOptions = {
      origin: [
         'http://127.0.0.1:3000',
         'http://localhost:3000',
         'http://127.0.0.1:5173',
         'http://localhost:5173',
      ],
      credentials: true,
   }
   app.use(cors(corsOptions))
}

// Routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

setupSocketAPI(server)

// app.get('/**', (req, res) => {
//    res.sendFile(path.resolve('public/index.html'))
// })

const PORT = process.env.PORT || 3030
// console.log(process.env)
server.listen(PORT, () => {
   logger.info(`Server is running on port ${PORT}`)
})
