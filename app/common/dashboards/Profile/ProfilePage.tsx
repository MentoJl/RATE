'use client'

import { Stack } from '@mui/material'
import ProfileCard from '@/app/common/components/ProfileCard'
import UsersCard from '@/app/common/components/UsersCard'
import CartCard from '@/app/common/components/CartCard'
import UserProductsCard from '@/app/common/components/UserProductsCard'
import { Splitter } from 'antd'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

// Extend the Session type to include the role property
declare module 'next-auth' {
  interface Session {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string | null
    }
  }
}
import '@ant-design/v5-patch-for-react-19'

const ProfilePage = () => {

  const { data: session } = useSession()

  return (
    <Stack sx={{ margin: '10px' }}>
      <Splitter>
        <Splitter.Panel defaultSize="75%" min="40%" max="75%">
          <Stack spacing={1}>
            <ProfileCard />
            <UserProductsCard/>
            { session?.user?.role === "GlobalAdmin" && <UsersCard /> }
          </Stack>
        </Splitter.Panel>
        <Splitter.Panel style={{ paddingBottom: '20px' }}>
          <CartCard />
        </Splitter.Panel>
      </Splitter>
    </Stack>
  )
}

export default ProfilePage