import { NextFunction, Request, Response } from "express"
import * as jwt from 'jsonwebtoken'

class LoginMiddleware {
  public async validadeTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if(authorization) {
      const token = authorization.split(' ').splice(-1)[0]

        try {
          const isValidToken = jwt.verify(token, 'secret')

          isValidToken && next()
        } catch (error) {
          res.status(403).send({
            message: 'Este token não é válido!'
          }) 
        }
        
    } else {
      res.status(401).send({
        message: 'Não autorizado!'
      })
    }
  }
}

export default new LoginMiddleware();