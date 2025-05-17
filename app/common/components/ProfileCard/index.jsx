import react, { useEffect, useState, useRef } from 'react'
import { Grid } from '@mui/system'
import { Box, Stack, TextField } from '@mui/material'
import { useSession, signOut, signIn } from 'next-auth/react'
import { Image, Card, Dropdown, Button, Tag, message } from 'antd'
import { EditOutlined, LogoutOutlined, SaveOutlined } from '@ant-design/icons'
import { useEditUserMutation } from '@/app/routes/userApi'
import getRoleTagColor from '@/utils/getRoleTagColor'
import getRoleLabel from '@/utils/getRoleLabel'
import getEmailRegex from '@/utils/getEmailRegex'

const ProfileCard = () => {
  const { data: session, status } = useSession()
  const [isEdit, setIsEdit] = useState(false)
  const username = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const repPassword = useRef(null)
  const [emailErr, setEmailErr] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const [editUser, { isLoading, isError }] = useEditUserMutation()

  const handleEditUser = async () => {
    if (!getEmailRegex().test(email?.current?.value)) {
      setEmailErr(true)
      return
    }
    setEmailErr(false)
    if (password?.current?.value !== repPassword?.current?.value) {
      setPassErr(true)
      return
    }
    setPassErr(false)
    try {
      await editUser({
        _id: session?.user?.id,
        email: email?.current?.value,
        password: password?.current?.value,
        name: username?.current?.value,
        role: session?.user?.role,
      })
      await signIn('credentials', {
        email: email?.current?.value,
        password: password?.current?.value,
        redirect: false,
      })
      message.success("Данні профілю оновлено")
    } catch (err) {
      message.error("Сталася помилка при редагуванні")
    }
    setIsEdit(false)
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
          disabled: isLoading ? true : false,
          label: isEdit
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
          disabled: isLoading ? true : false,
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
      title="ЗАГАЛЬНА ІНФОРМАЦІЯ"
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
              error={emailErr}
              helperText={emailErr ? 'Неправильний формат пошти' : ''}
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

          {isEdit && <Grid item xs={12} sm={12}>
            <TextField
              inputRef={repPassword}
              error={passErr}
              helperText={passErr ? 'Паролі не співпадають' : ''}
              fullWidth
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
          </Grid>}
        </Grid>
      </Stack>
    </Card>
  )
}

export default ProfileCard