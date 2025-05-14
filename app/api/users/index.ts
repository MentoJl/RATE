import express, { Request, Response } from 'express'
import { connectToMongo } from '@/server/db'
import UsersSchema from '@/server/models/User'

const router = express.Router()
connectToMongo()

router.get('/', async (req: Request, res: Response) => {
  const docs = await UsersSchema.find()
  res.json(docs)
})

router.patch('/', async (req: Request, res: Response) => {
  const docs = await UsersSchema.find()
  res.json(docs)
})

export default router
