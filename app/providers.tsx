'use client'

import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/app/store'
import { SessionProvider } from 'next-auth/react'
import Header from '@/app/common/components/Header'
import PageSkeleton from '@/app/common/components/PageSkeleton'
import { FloatButton } from 'antd'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>
        <PageSkeleton />
        <Header />
        {children}
        <FloatButton.BackTop />
      </SessionProvider>
    </ReduxProvider>
  )
}
