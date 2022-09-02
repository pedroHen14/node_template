import { Router } from 'express'
import usersController from '../controllers/UsersController'

export const usersRouter = Router();

usersRouter.get('/', usersController.findAll)
usersRouter.get('/:id', usersController.findById)
usersRouter.post('/create', usersController.create)
// usersRouter.delete('/', usersController.deleteUser)