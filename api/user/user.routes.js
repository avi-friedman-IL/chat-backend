import express from 'express'
import { addUser, deleteUser, getUserById, getUsers, updateUser } from './user.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

export const userRoutes = express.Router()

userRoutes.get('/', requireAuth, getUsers)
userRoutes.get('/:id', requireAuth, getUserById)
userRoutes.post('/', requireAuth, addUser)
userRoutes.put('/:id', requireAuth, updateUser)
userRoutes.delete('/:id', requireAuth, deleteUser)
