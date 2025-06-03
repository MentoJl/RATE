import express, { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { connectToMongo } from '@/server/db'
import UsersSchema from '@/server/models/User'

const router = express.Router()
connectToMongo()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'public/uploads/avatars')
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, `${uniqueSuffix}${ext}`)
  },
})

const upload = multer({ storage })

router.get('/', async (req: Request, res: Response) => {
  const docs = await UsersSchema.find()
  res.json(docs)
})

router.patch('/', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { _id, email, password, name, role } = req.body
    const file = req.file

    if (!_id) {
      res.status(400).json({ message: 'User ID is required' })
    }

    const updateData: any = { email, password, name, role }

    if (file) {
      updateData.image = `/uploads/avatars/${file.filename}`
    }

    const updatedUser = await UsersSchema.findByIdAndUpdate(_id, updateData, {
      new: true,
    })

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
    }

    res.json({ success: true, user: updatedUser })
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
