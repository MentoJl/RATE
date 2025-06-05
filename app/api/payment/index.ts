import express, { Request, Response } from 'express'
import Stripe from 'stripe'

const router = express.Router()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { amount } = req.body

    if (!amount || typeof amount !== 'number') {
      res.status(400).json({ error: 'Invalid or missing amount' })
      return
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Stripe payment error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
