import Cryptr from 'cryptr'
import { userService } from '../user/user.service.js'

const SECRET = process.env.SECRET || 'Secret-Puk-1234'
const cryptr = new Cryptr(SECRET)

export const authService = {
   signup,
   login,
   getLoginToken,
   validateToken,
}

async function signup(username, password, fullname) {
   const user = {
      username,
      password,
      fullname,
   }
   try {
      const existingUser = await userService.getByUsername(username)
      if (existingUser) throw new Error('Username already exists')
         
      const userToSave = await userService.add(user)
      return userToSave
   } catch (error) {
      throw error
   }
}

async function login(username, password) {
   try {
      const user = await userService.getByUsername(username)
      if (!user) throw new Error('User not found')
      if (user.password !== password) throw new Error('Invalid password')
      return user
   } catch (error) {
      throw error
   }
}

function getLoginToken(user) {
   const userInfo = {
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
   }
   return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
   try {
      const json = cryptr.decrypt(loginToken)
      const loggedinUser = JSON.parse(json)
      return loggedinUser
   } catch (err) {
      console.log('Invalid login token')
   }
   return null
}
