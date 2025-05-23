'use client'

import React, { useEffect } from 'react'
import { Grid } from '@mui/system'
import { TextField, Button, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import { message, Upload, UploadProps } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'

const Feedback = () => {

  const { Dragger } = Upload
  const { data: session } = useSession()
  const [fileList, setFileList] = React.useState<UploadFile[]>([])

  useEffect(() => {
    console.log(fileList)
  }, [fileList])

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onChange(info) {
      const { status } = info.file
      // if (status !== 'uploading') {
      //   console.log(info.file, info.fileList)
      // }
      if (status === 'done') {
        message.success(`Файл успішно завантажено.`)
        setFileList(info.fileList)
      } else if (status === 'error') {
        message.error(`Помилка при завантажені файлу.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
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
        // border: "1px solid black",
        marginTop: "20vh"
      }}
    >
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
            // label="Пошта"
            placeholder='Моя пошта'
            disabled={session ? true : false}
            defaultValue={session ? session?.user?.email : ''}
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
              // label="Пошта"
              placeholder='Тема листа'
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
              // label="Пошта"
              multiline
              placeholder='Опис листа'
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
            >
            Надіслати
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Feedback