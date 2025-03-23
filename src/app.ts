import e from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'
import { Request, Response } from 'express-serve-static-core'
import sessionMiddleware from './middlewares/sessionMiddleware.js'
import sessionCounter from './middlewares/sessionCounter.js'

const port = process.env.PORT

const app = e()

app.use(
  cors({
    origin: `http://localhost:${port}`,
    credentials: true,
  })
)
app.use(helmet())
app.use(e.json())
app.use(e.urlencoded({ extended: true }))
app.use(e.static('public'))

app.use(sessionMiddleware)
app.use(sessionCounter)

app.get('/', (req: Request, res: Response) => {
  res.json(`Count = ${req.session.count}`)
})

export default app
