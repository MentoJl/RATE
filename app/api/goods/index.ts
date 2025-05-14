import express, { Request, Response } from 'express'
import { connectToMongo } from '@/server/db'
import GoodsSchema from '@/server/models/Goods'

const router = express.Router()
connectToMongo()

router.get('/', async (req: Request, res: Response) => {
  const docs = await GoodsSchema.find()
  res.json(docs)
})

router.post('/', async (req: Request, res: Response) => {
  const { name, price } = req.body
  
  res.json("ok")
})

export default router