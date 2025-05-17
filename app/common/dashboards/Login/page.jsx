'use client'

import { Button, Input, Space, Flex, Typography, Tooltip, message, Form } from "antd"
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import React, { useState, useRef, useEffect } from "react"
import { signIn } from "next-auth/react"

const LoginDashboard = () => {
  const { Title } = Typography
  const [passwordError, setPasswordError] = useState(false)

  const handleLogin = async (values) => {
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: '/'
    })

    if (response?.error) {
      message.error('Невірний логін або пароль')
    } else if (response?.ok) {
      message.success('Успішний вхід')
    }
  }

  return (
    <Flex vertical justify="center" align="center" style={{ height: "80vh" }}>
      <Title level={2}>Вхід</Title>
      <Form
        name="login"
        style={{ width: 400 }}
        onFinish={handleLogin}
        initialValues={{ email: '', password: '' }}
        autoComplete="on"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Введіть email' }]}
        >
          <Input
            name="email"
            autoComplete="email"
            size="large"
            placeholder="Пошта"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введіть пароль' }]}
        >
          <Input.Password
            name="password"
            autoComplete="current-password"
            size="large"
            placeholder="Пароль"
            prefix={<LockOutlined />}
            onChange={(e) => {
              setPasswordError(e.target.value.length > 0 && e.target.value.length <= 3)
            }}
            suffix={passwordError &&
              <Tooltip title='Пароль повинен бути більше 3 символів' color='red'>
                <ExclamationCircleOutlined />
              </Tooltip>}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
            Увійти
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default LoginDashboard
