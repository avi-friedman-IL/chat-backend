import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

export const userService = {
   query,
   getById,
   getByUsername,
   add,
   remove,
   update,
}
async function query(filterBy) {
   try {
      const collection = await dbService.getCollection('user')
      const users = await collection.find(filterBy).toArray()
      return users
   } catch (err) {
      console.error('Cannot find users', err)
      throw err
   }
}

async function getById(userId) {
    try {
       const collection = await dbService.getCollection('user')
       const user = await collection.findOne({
          _id: ObjectId.createFromHexString(userId),
       })
       return user
    } catch (err) {
       logger.error(`while finding user ${userId}`, err)
       throw err
    }
 }

 async function getByUsername(username) {
    try {
       const collection = await dbService.getCollection('user')
       const user = await collection.findOne({ username })
       return user
    } catch (err) {
       logger.error(`while finding user ${username}`, err)
       throw err
    }
 }
 
 
 async function add(user) {
    try {
       const collection = await dbService.getCollection('user')
       await collection.insertOne(user)
       return user
    } catch (err) {
       logger.error('cannot insert user', err)
       throw err
    }
 }
 
 async function remove(userId) {
    try {
       const collection = await dbService.getCollection('user')
       await collection.deleteOne({ _id: ObjectId.createFromHexString(userId) })
    } catch (err) {
       logger.error(`cannot remove user ${userId}`, err)
       throw err
    }
 }
 
 async function update(user) {
    try {
       const userToSave = { ...user }
       delete userToSave._id
       const collection = await dbService.getCollection('user')
       await collection.updateOne(
          { _id: ObjectId.createFromHexString(user._id) },
          { $set: userToSave }
       )
       return user
    } catch (err) {
       logger.error('cannot update user', err)
       throw err
    }
 }
 
