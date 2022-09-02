import express from 'express'
import { router } from './routes/index'

export const app = express();

app.use(express.json())

app.use('/api', router)

app.listen(3333, () => 'server running on port 3333')
