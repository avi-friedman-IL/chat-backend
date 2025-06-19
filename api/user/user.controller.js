import { logger } from '../../services/logger.service.js'
import { socketService } from '../../services/socket.service.js'
import { userService } from './user.service.js'
export async function getUsers(req, res) {
    const filterBy = req.query
    try {
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get users' })
        logger.error('Failed to get users', err)
    }
}


export async function getUserById(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get user' })
        logger.error('Failed to get user', err)
    }
}

export async function addUser(req, res) {
    try {
        const user = await userService.add(req.body)
        res.send(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add user' })
        logger.error('Failed to add user', err)
    }
}

export async function updateUser(req, res) {
    try {
        const user = await userService.update(req.body)
        socketService.emitToUser('user-updated', user, user._id)
        res.send(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update user' })
        logger.error('Failed to update user', err)
    }
}

export async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'User deleted successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to delete user' })
        logger.error('Failed to delete user', err)
    }
}



