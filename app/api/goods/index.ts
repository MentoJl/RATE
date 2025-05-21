import express, { Request, Response } from 'express'
import { connectToMongo } from '@/server/db'
import GoodsSchema from '@/server/models/Goods'

const router = express.Router()
connectToMongo()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { searchValue = '' } = req.query

    const filter = searchValue
      ? { title: { $regex: searchValue, $options: 'i' } }
      : {}

    const items = await GoodsSchema.find(filter)

    res.json(items)
  } catch (error) {
    console.error('Error fetching goods:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  const { name, price } = req.body
  
  res.json("ok")
})

export default router