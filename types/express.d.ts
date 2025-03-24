import 'express'

declare global {
    namespace Express {
        interface User {
            id: string,
            username: string,
            hash: string,
            salt: string
        }
    }
}