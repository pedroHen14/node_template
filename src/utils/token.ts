import * as jwt from 'jsonwebtoken'

export const generateToken = (payload: { id: number, name: string, email: string }) => {
  return jwt.sign(payload, 'secret', {
    expiresIn: '1h'
  })
}