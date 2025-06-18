import { Server } from 'socket.io'
import { logger } from './logger.service.js'

var gIo = null

export function setupSocketAPI(http) {
   gIo = new Server(http, {
      cors: {
         origin: '*',
      },
   })
   gIo.on('connection', socket => {
      logger.info('Client connected')
      socket.on('disconnect', () => {
         logger.info('Client disconnected')
      })
      socket.on('set-user-socket', (userId) => {
        socket.userId = userId
      })
      socket.on('unset-user-socket', () => {
         delete socket.userId
      })
   })
}

async function emitToUser(type, data, userId) {
    userId = userId.toString()
   const socket = await _getUserSocket(userId)
   if (socket) {
      socket.emit(type, data)
      logger.info(`Emitted to user ${userId}`)
   } else {
      logger.info(`No socket found for user ${userId}`)
   }
}

async function _getUserSocket(userId) {
   const sockets = await _getAllSockets()
   const socket = sockets.find(socket => socket.userId === userId)
   return socket
}

async function _getAllSockets() {
   const sockets = await gIo.fetchSockets()
   return sockets
}

export const socketService = {
   setupSocketAPI,
   emitToUser,
}