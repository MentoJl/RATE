'use client'

import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/app/store'
import { SessionProvider } from 'next-auth/react'
import Header from '@/app/common/components/Header'
import PageSkeleton from '@/app/common/components/PageSkeleton'
import { FloatButton } from 'antd'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>
        <Elements stripe={stripePromise}>
          <PageSkeleton />
          <Header />
          {children}
          <FloatButton.BackTop />
        </Elements>
      </SessionProvider>
    </ReduxProvider>
  )
}
