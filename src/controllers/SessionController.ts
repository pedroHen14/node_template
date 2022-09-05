import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt";
import { Request, Response } from "express";
import { generateToken } from "../utils/token";

const prisma = new PrismaClient()

class SessionController {
  public async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userExists = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!userExists || !compareSync(password, userExists.password))
        return res.status(403).send({ error: 'Usuário e/ou senha inválidos' })

      const token = generateToken({ 
        name: userExists.name,
        email,
        id: Number(userExists.id)
      })

      res.status(201).send({
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        token
      })
    } catch (error) {
      res.status(400)
    }
  }
}

export default new SessionController();