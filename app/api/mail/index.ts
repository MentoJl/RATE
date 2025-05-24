import express, { Request, Response } from 'express'
import multer from 'multer'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', upload.array('files'), async (req: Request, res: Response) => {
  const { name, email, theme, desc } = req.body
  const files = req.files as Express.Multer.File[]

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_TO,
      subject: theme,
      text: desc,
      attachments: files.map(file => ({
        filename: file.originalname,
        content: file.buffer,
      }))
    })

    res.status(200).json({ success: true, message: 'Mail sent successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Fail :(' })
  }
})

export default router