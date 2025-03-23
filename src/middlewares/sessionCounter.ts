import { Request, Response, NextFunction } from 'express-serve-static-core'

const sessionCounter = (req: Request, _res: Response, next: NextFunction) => {
  if (req.session.count) {
    req.session.count++
  } else {
    req.session.count = 1
  }

  next()
}

export default sessionCounter
