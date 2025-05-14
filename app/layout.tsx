'use client'

import React from 'react'
import { Provider } from "react-redux"
import './global.scss'
import { store } from './store'
import '@ant-design/v5-patch-for-react-19'
import Header from "./common/components/Header"
import PageSkeleton from "./common/components/PageSkeleton"
import { FloatButton } from "antd"
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html>
      <body style={{ margin: 0, backgroundColor: "#f0f2f5" }}>
        <Provider store={store}>
          <SessionProvider>
            <PageSkeleton/>
            <Header/>
            {children}
            <FloatButton.BackTop/>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  )
}