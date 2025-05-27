import express, { Request, Response } from 'express'
import { connectToMongo } from '@/server/db'
import OrderSchema from '@/server/models/Order'

const router = express.Router()
connectToMongo()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, goods, totalSum } = req.body
    
    if (!userId || !goods || totalSum === undefined) {
      res.status(400).json({ message: 'Missing required fields' })
    }

    const newOrder = new OrderSchema({
      userId,
      goods,
      totalSum,
      status: 'created',
    })  

    await newOrder.save()
    res.status(201).json({ success: true, orderId: newOrder._id })
  } catch (err) {
    res.status(500).json({ success: false, message: err })
    return
  }
})

export default router