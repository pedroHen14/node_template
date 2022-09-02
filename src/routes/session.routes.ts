import { Router } from 'express'
import sessionController from '../controllers/SessionController'

export const sessionRouter = Router();

sessionRouter.post('/', sessionController.create)