'use client'

import { Stack } from '@mui/material'
import ProfileCard from '@/app/common/components/ProfileCard'
import UsersCard from '@/app/common/components/UsersCard'
import CartCard from '@/app/common/components/CartCard'
import { Splitter } from 'antd'
import '@ant-design/v5-patch-for-react-19'

const ProfilePage = () => {
  return (
    <Stack sx={{ margin: '10px' }}>
      <Splitter>
        <Splitter.Panel defaultSize="75%" min="40%" max="75%">
          <Stack spacing={1}>
            <ProfileCard />
            <UsersCard />
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