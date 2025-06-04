'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Grid } from '@mui/system'
import { TextField, Button, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import { message, Upload, UploadProps, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import getEmailRegex from '@/utils/getEmailRegex'
import { InboxOutlined } from '@ant-design/icons'
import { useSendMailMutation } from '@/app/routes/mailApi'
import '@ant-design/v5-patch-for-react-19'

import type { UploadFile } from 'antd/es/upload/interface'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const FeedbackPage = () => {

  const { Dragger } = Upload
  const { data: session } = useSession()
  const [messageApi, contextHolder] = notification.useNotification()
  const [sendMail, { isLoading, isError}] = useSendMailMutation()

  const [fileList, setFileList] = React.useState<UploadFile[]>([])
  const emailRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const themeRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [themeError, setThemeError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)

  const openNotification = (
    type: NotificationType, 
    message: string = '', 
    desc: string = '',
    icon: React.ReactNode | string = ''
  ) => {
    messageApi[type]({
      message: message,
      placement: 'topRight',
      description: desc,
      duration: 2,
      icon,
    })
  }

  const handleSubmit = async () => {
    if (!emailRef?.current?.value) {
      openNotification('error', 'Пошта', 'Введіть Пошту')
      setEmailError(true)
      return
    }
    setEmailError(false)
    if (!nameRef?.current?.value) {
      openNotification("error", "Ім'я", "Введіть Ім'я")
      setNameError(true)
      return
    }
    setNameError(false)
    if (!themeRef?.current?.value) {
      openNotification("error", "Тема листа", "Введіть Тему листа")
      setThemeError(true)
      return
    }
    setThemeError(false)
    if (!descriptionRef?.current?.value) {
      openNotification("error", "Опис листа", "Введіть Опис листа")
      setDescriptionError(true)
      return
    }
    setDescriptionError(false)
    if (!getEmailRegex().test(emailRef?.current?.value ?? '')) {
      openNotification('error', 'Пошта', 'Введіть коректну Пошту')
      setEmailError(true)
      return
    }
    setEmailError(false)
    openNotification('info', 'Обробка', 'Будь ласка зачекайте', <LoadingOutlined />)
    try {

      const formData = new FormData()
      formData.append('email', emailRef.current.value)
      formData.append('name', nameRef.current.value)
      formData.append('theme', themeRef.current.value)
      formData.append('desc', descriptionRef.current.value)
    
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('files', file.originFileObj)
        }
      })

      const response = await sendMail(formData).unwrap()

      if (response.success) {
        openNotification('success', 'Успіх', 'Лист успішно надіслано')
        setFileList([])
      } else {
        openNotification('error', 'Помилка', response.message || 'Не вдалося надіслати лист')
      }
    } catch (error) {
      openNotification('error', 'Помилка', 'Сталася помилка при надсиланні листа')
    }
  }

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onChange(info) {
      const { status } = info.file
      if (status === 'done') {
        message.success(`Файл успішно завантажено.`)
        setFileList(info.fileList)
      } else if (status === 'error') {
        message.error(`Помилка при завантажені файлу.`)
      }
    },
  }

  return (
    <Stack
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20vh"
      }}
    >
      {contextHolder}
      <Grid
        container
        spacing={6}
        direction="column"
      >
        <Grid
          size={12}
        >
          <TextField
            variant="standard"
            placeholder='Моя пошта'
            inputRef={emailRef}
            error={emailError ? true : false}
            disabled={session?.user?.email ? true : false}
            defaultValue={session?.user?.email ? session?.user?.email : ''}
            sx={{
              width: '100%',
            }}
            InputProps={{
              sx: {
                fontSize: '20px',
                '& input': {
                  textAlign: 'center',
                },
              },
            }}
          />
        </Grid>
        <Grid
          size={12}
          sx={{
            width: 'auto'
          }}
        >
          <Stack
            direction='row'
            spacing={4}
          >
            <TextField
              variant="standard"
              placeholder="Ім'я"
              inputRef={nameRef}
              error={nameError ? true : false}
              disabled={session?.user?.name ? true : false}
            defaultValue={session?.user?.name ? session?.user?.name : ''}
              sx={{
                width: '50%',
              }}
              InputProps={{
                sx: {
                  fontSize: '20px',
                  '& input': {
                    textAlign: 'center',
                  },
                },
              }}
            />
            <TextField
              variant="standard"
              placeholder='Тема листа'
              inputRef={themeRef}
              error={themeError ? true : false}
              sx={{
                width: '50%',
              }}
              InputProps={{
                sx: {
                  fontSize: '20px',
                  '& input': {
                    textAlign: 'center',
                  },
                },
              }}
            />
          </Stack>
        </Grid>
        <Grid
          size={12}
          direction={"column"}
        >
          <Stack
            direction='column'
            spacing={4}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              variant="outlined"
              multiline
              placeholder='Опис листа'
              inputRef={descriptionRef}
              error={descriptionError ? true : false}
              sx={{
                width: '100%',
              }}
              InputProps={{
                sx: {
                  fontSize: '20px',
                },
              }}
            />
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Натисніть або перенесіть файл сюди</p>
              <p className="ant-upload-hint">
                Підтримка одиночного або масового завантаження. Категорично заборонено завантажувати дані компанії та інші
                заборонені файли.
              </p>
            </Dragger>
            <Button 
              color="primary"
              variant="contained"
              sx={{
                width: '200px'
              }}
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
            >
            {isLoading ? <><LoadingOutlined/>'Надіслати'</> : 'Надіслати'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default FeedbackPage