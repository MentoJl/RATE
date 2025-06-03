import express, { Request, Response } from 'express'
import { connectToMongo } from '@/server/db'
import CommentsSchema from '@/server/models/Comments'

const router = express.Router()
connectToMongo()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { productId } = req.query

    if (!productId) {
      res.status(400).json({ message: 'Missing productId' })
    }

    const comments = await CommentsSchema.find({ productId }).populate('userId')
    res.status(200).json(comments)
  } catch (err) {
    res.status(500).json({ success: false, message: err })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, productId, text, rate } = req.body
    
    if (!userId) {
      res.status(400).json({ message: 'Missing userId' })
    }

    const newComment = new CommentsSchema({
      userId,
      productId,
      text,
      rate,
    })  

    await newComment.save()
    res.status(201).json({ success: true, commentId: newComment._id })
  } catch (err) {
    res.status(500).json({ success: false, message: err })
  }
})

export default router