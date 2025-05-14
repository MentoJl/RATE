import react, { useEffect, useState, useRef } from 'react'
import { Grid } from '@mui/system'
import { Box, Stack, TextField } from '@mui/material'
import { useSession, signOut } from 'next-auth/react'
import { Image, Card, Dropdown, Button, Tag } from 'antd'
import { EditOutlined, LogoutOutlined, SaveOutlined } from '@ant-design/icons'
import { useEditUserMutation } from '@/app/routes/userApi'
import getRoleTagColor from '@/utils/getRoleTagColor'
import getRoleLabel from '@/utils/getRoleLabel'

const ProfileCard = () => {
  const { data: session, status } = useSession()
  const [isEdit, setIsEdit] = useState(false)
  const username = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const repPassword = useRef(null)
  const { editUser } = useEditUserMutation()

  const handleEditUser = () => {
    console.log(username?.current?.value)
  }

  const handleLogout = () => {
    signOut({
      callbackUrl: "/"
    })
  }

  const DropDownMenu = () => {
    return {
      items: [
        {
          value: 1,
          label:  isEdit 
          ? "Зберегти" 
          : "Редагувати",

          icon: isEdit 
          ? <SaveOutlined /> 
          : <EditOutlined />,

          onClick: (event) => isEdit 
          ? handleEditUser(event) 
          : setIsEdit(true)
        },
        {
          value: 2,
          label: "Вийти",
          danger: true,
          icon: <LogoutOutlined />,
          onClick: () => handleLogout()
        },
      ]
    }
  }

  const ExtrasMenu = () => {
    return (
      <>
        <Tag color={getRoleTagColor(session?.user?.role)}>{getRoleLabel(session?.user?.role)}</Tag>
        <Dropdown menu={DropDownMenu()} placement="bottomRight">
          <Button>
            • • •
          </Button>
        </Dropdown>
      </>
    )
  }

  return (
  <Card
    title="ЗАГАЛЬНА ІНФОРМАЦІЯ КОРИСТУВАЧА"
    hoverable
    extra={ExtrasMenu()}
    style={{
      width: "100%",
    }}
  >
    <Stack
      container="true"
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 5, sm: 5, md: 15 }}
      sx={{
        marginTop: "px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        <Box
          sx={{
            borderRadius: "50%",
            overflow: "hidden",
            width: "240px",
            height: "240px",
            minHeight: "240px",
            minWidth: "240px",
          }}
        >
          <Image src='./user/image.png' style={{ borderRadius: "50%" }} />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <TextField
              inputRef={username}
              fullWidth
              label="Ім'я"
              defaultValue={session?.user?.name}
              disabled={!isEdit}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              inputRef={email}
              fullWidth
              label="Пошта"
              defaultValue={session?.user?.email}
              disabled={!isEdit}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              inputRef={password}
              fullWidth
              label="Пароль"
              type={isEdit ? 'text' : 'password'}
              defaultValue={session?.user?.password}
              disabled={!isEdit}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              inputRef={repPassword}
              fullWidth
              sx={{
                visibility: isEdit ? 'visible' : 'hidden',
              }}
              label="Підтвердження паролю"
              type={isEdit ? 'text' : 'password'}
              defaultValue={session?.user?.password}
              disabled={!isEdit}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
        </Grid>

    </Stack>
  </Card>
  )
}

export default ProfileCard