import react, { useEffect, useState, useRef, useMemo } from 'react'
import { Grid } from '@mui/system'
import { Box, Stack, TextField } from '@mui/material'
import { useSession, signOut, signIn } from 'next-auth/react'
import { Image, Card, Dropdown, Button, Tag, message, Upload } from 'antd'
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
  const [avatar, setAvatar] = useState(null)
  const [fileList, setFileList] = useState([])
  const [previewImage, setPreviewImage] = useState(session?.user?.avatar)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editUser, { isLoading, isError }] = useEditUserMutation()

  const uploadButton = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <img
        src={session?.user?.avatar || '/user/image.png'}
        alt="avatar"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
          border: '2px dashed #d9d9d9',
          transition: 'border 0.3s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.border = '2px dashed #1890ff')}
        onMouseOut={(e) => (e.currentTarget.style.border = '2px dashed #d9d9d9')}
      />
      <div
        style={{
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 500,
          color: '#1890ff',
          cursor: 'pointer',
        }}
      >
        Завантажити іншу
      </div>
    </div>
  )


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    const file = newFileList?.[0]?.originFileObj
    if (file) setAvatar(file) // ← это уже для handleEditUser
  }


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
      const formData = new FormData()
      formData.append('_id', session?.user?.id)
      formData.append('email', email?.current?.value)
      formData.append('password', password?.current?.value)
      formData.append('name', username?.current?.value)
      formData.append('role', session?.user?.role)

      if (avatar) {
        formData.append('image', avatar)
      }

      await editUser(formData).unwrap()

      await signIn('credentials', {
        email: email?.current?.value,
        password: password?.current?.value,
        redirect: false,
      })

      message.success("Данні профілю оновлено")
      setIsEdit(false)
    } catch (err) {
      console.error(err)
      message.error("Сталася помилка при редагуванні")
    }
  }


  const handleLogout = () => {
    signOut({
      callbackUrl: "/"
    })
  }

  const DropDownMenu = useMemo(() => {
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
  }, [session, isEdit])

  const ExtrasMenu = useMemo(() => {
    return (
      <>
        <Tag color={getRoleTagColor(session?.user?.role)}>{getRoleLabel(session?.user?.role)}</Tag>
        <Dropdown menu={DropDownMenu} placement="bottomRight">
          <Button>
            • • •
          </Button>
        </Dropdown>
      </>
    )
  }, [session, isEdit])

  return (
    <Card
      title="ЗАГАЛЬНА ІНФОРМАЦІЯ"
      hoverable
      extra={ExtrasMenu}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isEdit ? (
            <>
              <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
                accept="image/*"
                maxCount={1}
                showUploadList={{ showRemoveIcon: true }}
                style={{ 
                  cursor: 'pointer',
                  width: 160,
                  height: 160,
                }}
              >
                {fileList.length >= 1 || previewImage ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  width={240}
                  height={240}
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                  }}
                  src={previewImage || null}
                />
              )}
            </>
          ) : (
            <Image
              src={session?.user?.avatar || './user/image.png'}
              width={240}
              height={240}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              preview={false}
            />
          )}
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