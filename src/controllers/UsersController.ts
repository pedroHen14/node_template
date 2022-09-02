import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/token";

const prisma = new PrismaClient()

class UsersController {
  public async findAll(_: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();

      res.status(200).json(users)
    } catch (error) {
      res.status(400)
    }
  }

  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const userExists = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (userExists) {
        res.status(409)
      }

      const passwordCript = bcrypt.hashSync(password, 10)
      
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: passwordCript
        },
      })
      
      const token = generateToken({
        name,
        email,
        id: Number(user.id)
      })

      res.status(201).send({
        name,
        email,
        token
      })
    } catch (error) {
      res.status(400)
    }
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id)
        }
      })

      res.status(200).json(user)
    } catch (error) {
      res.status(404)
    }
  }
}

export default new UsersController();