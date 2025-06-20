// import dotenv from 'dotenv'
// dotenv.config()
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { setupSocketAPI } from './services/socket.service.js'
import { logger } from './services/logger.service.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { chatRoutes } from './api/chat/chat.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const server = http.createServer(app)
setupSocketAPI(server)
app.use(cookieParser())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, 'public')))
} else {
   app.use(express.static('public'))
   const corsOptions = {
      origin: [
         'http://127.0.0.1:3000',
         'http://localhost:3000',
         'http://127.0.0.1:3030',
         'http://localhost:3030',
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

// This should be the last route - it catches all other routes and serves the React app
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3030
console.log('Environment:', process.env.NODE_ENV)
console.log('Current directory:', __dirname)

server.listen(PORT, () => {
   logger.info(`Server is running on port ${PORT}`)
})
