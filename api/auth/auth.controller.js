import { authService } from './auth.service.js'

export async function signup(req, res) {
   try {
      const { username, password, fullname} = req.body
      const account = await authService.signup(username, password, fullname)
      const user = await authService.login(username, password)
      const loginToken = authService.getLoginToken(user)
      res.cookie('loginToken', loginToken)
      res.status(201).send(user)
   } catch (error) {
      res.status(500).send({ error: error.message })
   }
}

export async function login(req, res) {
   try {
      const { username, password } = req.body
      const user = await authService.login(username, password)
      const loginToken = authService.getLoginToken(user)
      res.cookie('loginToken', loginToken)
      res.send(user)
   } catch (error) {
      res.status(500).send({ error: error.message })
   }
}

export async function logout(req, res) {
   try {
      res.clearCookie('loginToken')
      res.status(200).send({ message: 'Logged out successfully' })
   } catch (error) {
      res.status(500).send({ error: error.message })
   }
}
