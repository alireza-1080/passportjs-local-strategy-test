import e from 'express'
import { Request, Response } from 'express-serve-static-core'
import '../config/passport.js'
import passport from 'passport'
import generatePassword from '../utils/generatePassword.js'
import prisma from '../services/prisma.service.js'

type RegisterRequestBody = {
  password: string
  username: string
}

const router = e.Router()

router.post('/register', async (req: Request<object, object, RegisterRequestBody>, res: Response) => {
  try {
    const { username, password } = req.body

    console.log({ username, password })

    const { salt, generatedHash: hash } = generatePassword(password)

    await prisma.user.create({
      data: {
        username,
        salt,
        hash,
      },
    })

    res.status(200).json({ message: 'Registration was successful' })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed on the constraint: `User_username_key`')) {
        res.status(400).json({ message: 'username is already taken' })
        return
      } else {
        console.log(error)
        res.status(400).json({ message: 'An error occurred during registration' })
      }
    } else console.log(`Unknown error occurred in "/register"`)
  }
})

router.post('/login', passport.authenticate('local', {}), (_req: Request, _res: Response) => {})

export default router
