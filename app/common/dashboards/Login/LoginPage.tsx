'use client'

import {
  Button, 
  Input, 
  Flex, 
  Typography, 
  Tooltip, 
  message, 
  Form, 
  Tabs
} from 'antd'
import {
  UserOutlined, 
  LockOutlined, 
  ExclamationCircleOutlined, 
  MailOutlined
} from '@ant-design/icons'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import '@ant-design/v5-patch-for-react-19'
import { useCreateUserMutation } from '@/app/routes/userApi'

const { Title } = Typography

const LoginPage = () => {
  const [passwordError, setPasswordError] = useState(false)
  const [formLogin] = Form.useForm()
  const [formRegister] = Form.useForm()
  const [ createUser, { isLoading: isCreating, isError }] = useCreateUserMutation()

  const handleLogin = async (values: any) => {
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: '/',
    })

    if (response?.error) {
      message.error('Невірний логін або пароль')
    } else if (response?.ok) {
      message.success('Успішний вхід')
    }
  }

  const handleRegister = async (values: any) => {
    try {
      const res: any = await createUser({ 
        email: values.email,
        name: values.name,
        password: values.password,
        role: 'User',
      })

      if(res?.error) {
        message.error(res?.error?.data?.message)
        throw new Error(res?.error?.data?.message)
      }

      await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: '/',
      })

    } catch (error: any) {
      return
    }
  }

  const loginForm = (
    <Form
      form={formLogin}
      name="login"
      onFinish={handleLogin}
      autoComplete="on"
      layout="vertical"
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Введіть email' }]}
      >
        <Input
          size="large"
          placeholder="Пошта"
          prefix={<UserOutlined />}
          autoComplete="email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Введіть пароль' }]}
      >
        <Input.Password
          size="large"
          placeholder="Пароль"
          prefix={<LockOutlined />}
          autoComplete="current-password"
          onChange={(e) => {
            setPasswordError(e.target.value.length > 0 && e.target.value.length <= 3)
          }}
          suffix={passwordError &&
            <Tooltip title="Пароль повинен бути більше 3 символів" color="red">
              <ExclamationCircleOutlined />
            </Tooltip>}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Увійти
        </Button>
      </Form.Item>
    </Form>
  )

  const registerForm = (
    <Form
      form={formRegister}
      name="register"
      onFinish={handleRegister}
      autoComplete="on"
      layout="vertical"
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Введіть ім’я' }]}
      >
        <Input size="large" placeholder="Ім’я" prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, type: 'email', message: 'Введіть дійсний email' }]}
      >
        <Input size="large" placeholder="Пошта" prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Введіть пароль' }]}
      >
        <Input.Password
          size="large"
          placeholder="Пароль"
          prefix={<LockOutlined />}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Зареєструватися
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <Flex vertical justify="center" align="center" style={{ height: '80vh' }}>
      <Title level={2}>Авторизація</Title>
      <Tabs
        centered
        style={{ width: 400 }}
        items={[
          {
            key: 'login',
            label: 'Вхід',
            children: loginForm,
          },
          {
            key: 'register',
            label: 'Реєстрація',
            children: registerForm,
          },
        ]}
      />
    </Flex>
  )
}

export default LoginPage
