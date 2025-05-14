'use client'

import { Grid } from '@mui/system'
import { Stack } from '@mui/material'
import ProfileCard from '@/app/common/components/ProfileCard'

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
            <ProfileCard/>
          </Stack>
        </Grid>
        <Grid size={4}>
            <ProfileCard/>
          </Grid>
      </Grid>
    </Stack>
  )
}

export default ProfilePage