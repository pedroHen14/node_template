
import { Router } from 'express'
import { usersRouter } from './users.routes'
import { sessionRouter } from './session.routes'
import sessionMiddleware from '../middlewares/SessionMiddleware'

export const router = Router()

router.use('/session', sessionRouter)

router.use(sessionMiddleware.validadeTokenMiddleware)

router.use('/users', usersRouter)
