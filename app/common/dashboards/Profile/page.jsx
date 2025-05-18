'use client'

import { Grid } from '@mui/system'
import { Stack } from '@mui/material'
import ProfileCard from '@/app/common/components/ProfileCard'
import UsersCard from '@/app/common/components/UsersCard'
import CartCard from '@/app/common/components/CartCard'

const ProfilePage = () => {

  return (
    <Stack
      sx={{
        margin: "10px",
      }}
    >
      <Grid 
        container
        spacing={2}
      >
        <Grid size={8}>
          <Stack spacing={2}>
            <ProfileCard/>
            <UsersCard/>
          </Stack>
        </Grid>
        <Grid size={4}>
            <CartCard/>
          </Grid>
      </Grid>
    </Stack>
  )
}

export default ProfilePage