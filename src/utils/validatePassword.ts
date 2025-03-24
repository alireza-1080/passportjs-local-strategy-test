import crypto from 'crypto'

const validatePassword = (password: string, hash: string, salt: string): boolean => {
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

  return hash === hashedPassword
}

export default validatePassword
