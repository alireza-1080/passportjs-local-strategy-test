import crypto from 'crypto'

type GeneratedPassword = {
  salt: string
  generatedHash: string
}

const generatePassword = (password: string): GeneratedPassword => {
  const salt = crypto.randomBytes(32).toString('hex')
  const generatedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

  return {
    salt,
    generatedHash,
  }
}

export default generatePassword
