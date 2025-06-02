import express, { Request, Response } from 'express'
import { connectToMongo } from '@/server/db'
import GoodsSchema from '@/server/models/Goods'
import multer from 'multer'
import path from 'path'
import { Types } from 'mongoose'

const router = express.Router()
connectToMongo()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../server/uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({ storage })

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

router.post('/', upload.array('images'), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]
    
    const { title, userId, category, price, description, tags } = req.body
    
    const imagesPaths = files.map(f => `/uploads/${f.filename}`)

    const newGood = new GoodsSchema({
      title,
      domain: userId,
      category,
      price: Number(price),
      description,
      tags: JSON.parse(tags),
      images: imagesPaths,
    })

    await newGood.save()

    res.json({ success: true, data: newGood })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: `Server error: ${error}` })
  }
})

router.patch('/', async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'ok' })
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