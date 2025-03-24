import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import prisma from '../services/prisma.service.js'
import validatePassword from '../utils/validatePassword.js'
import { IVerifyOptions } from 'passport-local'

const verifyCallback = async (
  username: string,
  password: string,
  done: (error: Error | null, user?: Express.User | false, options?: IVerifyOptions) => void
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return done(null, false, { message: 'User not found' })
    }

    const isPasswordValid = validatePassword(password, user.hash, user.salt)

    if (!isPasswordValid) {
      return done(null, false, { message: 'Invalid password' })
    }

    return done(null, user)
  } catch (error) {
    if (error instanceof Error) {
      done(error)
    }
  }
}

const strategy = new LocalStrategy(verifyCallback)

passport.use(strategy)

// Needs to be clarified

passport.serializeUser<string>((user: Express.User, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: { id: true, username: true },
    })

    if (!user) {
      done(new Error('User not found'))
    }

    done(null, user)
  } catch (error) {
    if (error instanceof Error) {
      done(error)
    } else {
      done(new Error('Unknown error during deserialization'))
    }
  }
})
