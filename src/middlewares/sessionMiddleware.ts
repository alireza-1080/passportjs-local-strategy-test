import MongoStore from 'connect-mongo'
import session from 'express-session'
import 'dotenv/config'

const mongoUrl = process.env.DATABASE_URL
const secret = process.env.SESSION_SECRET as string

const store = MongoStore.create({
  mongoUrl,
  collectionName: 'session',
  // autoRemove: "native",
  // ttl: 1 * 24 * 60 * 60 // 1 day
})

const sessionMiddleware = session({
  secret,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    httpOnly: true,
    secure: process.env.LEVEL === 'development' ? false : true,
    sameSite: process.env.LEVEL === 'development' ? 'lax' : 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  },
})

export default sessionMiddleware
