'use client'

import { Grid } from '@mui/system'
import { Stack } from '@mui/material'
import ProfileCard from '@/app/common/components/ProfileCard'
import UsersCard from '@/app/common/components/UsersCard'
import CartCard from '@/app/common/components/CartCard'
import { Splitter } from 'antd'

const ProfilePage = () => {

  return (
    <Stack
      sx={{
        margin: "10px",
      }}
    >
      <Splitter>
        <Splitter.Panel defaultSize="75%" min="40%" max="75%">
          <Stack spacing={1}>
            <ProfileCard />
            <UsersCard />
          </Stack>
        </Splitter.Panel>
        <Splitter.Panel>
          <CartCard />
        </Splitter.Panel>
      </Splitter>
    </Stack>
    // <Stack
    //   sx={{
    //     margin: "10px",
    //   }}
    // >
    //   <Grid
    //     container
    //     spacing={2}
    //     direction={{ xs: 'column', sm: 'row' }}
    //   >
    //     <Grid
    //       item
    //       size={8}
    //     >
    //       <Stack spacing={2}>
    //         <ProfileCard />
    //         <UsersCard />
    //       </Stack>
    //     </Grid>
    //     <Grid
    //       item
    //       size={4}
    //     >
    //       <CartCard />
    //     </Grid>
    //   </Grid>
    // </Stack>
  )
}

export default ProfilePage