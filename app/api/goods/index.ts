import express, { Request, Response } from 'express'
import { connectToMongo } from '@/server/db'
import GoodsSchema from '@/server/models/Goods'
import { Types } from 'mongoose'

const router = express.Router()
connectToMongo()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { search = '' } = req.query
    
    const filter = search
      ? { title: { $regex: search, $options: 'i' } }
      : {}

    const items = await GoodsSchema.find(filter)

    res.json(items)
  } catch (error) {
    console.error('Error fetching goods:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.get('/userId', async (req: Request, res: Response) => {
  try {
    const { _id = '' } = req.query

    const domainObjectId = new Types.ObjectId(`${_id}`)

    const items = await GoodsSchema.find({ domain: domainObjectId })

    res.json({ success: true, items })
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const item = await GoodsSchema.findById(id)

    res.json({ success: true, data: item })
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  const { name, price } = req.body
  
  res.json("ok")
})

router.delete('/', async (req: Request, res: Response) => {
  try {
    const { _id } = req.params
    const item = await GoodsSchema.findByIdAndDelete(_id)

    res.json({ success: true, data: item })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})

export default router