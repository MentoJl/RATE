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
  try {
    const { _id, email, password, name, role } = req.body

    if (!_id) {
      res.status(400).json({ message: 'User ID is required' })
    }

    const updatedUser = await UsersSchema.findByIdAndUpdate(
      _id,
      { email, password, name, role },
      { new: true }
    )

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Error updating user:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/', async (req: Request, res: Response) => {
  const { _id } = req.body

  if (!_id) {
    res.status(400).json({ message: 'User ID is required' })
  }

  const result = await UsersSchema.findOneAndDelete({ _id })

  if (!result) {
    res.status(404).json({ message: 'Користувач не видалений або не існує' })
  }

  res.status(200).json({ success: true, message: 'Користувач успішно видалений' })
})

export default router
