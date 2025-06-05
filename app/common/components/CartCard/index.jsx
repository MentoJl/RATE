'use client'

import React, { useState, useEffect } from 'react'
import {
  Card,
  Image,
  Button,
  Dropdown,
  Modal,
  Table,
  Popconfirm,
  Form,
  Input,
  message,
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Stack } from '@mui/material'
import { useCreateOrderMutation } from '@/app/routes/orderApi'
import { useSession } from 'next-auth/react'
import { useCreatePaymentMutation } from '@/app/routes/paymentApi'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      padding: '10px 12px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

const CartCard = () => {
  const [cartItems, setCartItems] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: session } = useSession()
  const [createOrder] = useCreateOrderMutation()
  const [form] = Form.useForm()
  const [createPayment, { isLoading: isCreating }] = useCreatePaymentMutation()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [cardError, setCardError] = useState(null)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || []
    const itemsWithId = items.map((item, idx) => ({
      ...item,
      id: item.productId || `item-${idx}`,
      totalPrice: item.quantity * item.price,
    }))
    setCartItems(itemsWithId)
  }, [])

  const handleDeleteProductFromCart = () => {
    if (selectedRowKeys.length === 0) return
    const newCartItems = cartItems.filter(item => !selectedRowKeys.includes(item.id))
    setCartItems(newCartItems)
    localStorage.setItem('cartItems', JSON.stringify(newCartItems))
    setSelectedRowKeys([])
  }

  const columns = [
    {
      title: '',
      dataIndex: 'image',
      width: 70,
      render: (image, record) => (
        <Image preview={false} src={`http://localhost:3001${image}`} alt={record.title} width={50} height={50} />
      ),
    },
    {
      title: 'Назва',
      dataIndex: 'title',
      width: 200,
    },
    {
      title: 'Кількість',
      dataIndex: 'quantity',
      width: 100,
      render: (quantity, record) => (
        <input
          type="number"
          min={1}
          value={quantity}
          style={{ width: '60px' }}
          onChange={(e) => {
            const newQuantity = parseInt(e.target.value, 10) || 1
            const updatedItems = cartItems.map(item =>
              item.id === record.id ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.price } : item
            )
            setCartItems(updatedItems)
            localStorage.setItem('cartItems', JSON.stringify(updatedItems))
          }}
        />
      ),
    },
    {
      title: 'Ціна (шт.)',
      dataIndex: 'price',
      width: 100,
      render: (price) => `${price} USD`,
    },
    {
      title: 'Сума',
      dataIndex: 'totalPrice',
      width: 100,
      render: (totalPrice) => `${totalPrice} USD`,
    },
  ]

  const DropMenu = (
    <Dropdown
      menu={{
        items: [
          {
            key: 'delete',
            danger: true,
            disabled: selectedRowKeys.length === 0,
            icon: <DeleteOutlined style={{ fontSize: '16px' }} />,
            label: (
              <Popconfirm
                title="Видалити вибрані товари?"
                onConfirm={handleDeleteProductFromCart}
                okText="Так"
                cancelText="Ні"
              >
                Видалити
              </Popconfirm>
            ),
          },
        ],
      }}
    >
      <Button>• • •</Button>
    </Dropdown>
  )

  const totalSum = cartItems.reduce((total, item) => total + item.totalPrice, 0)

  const handleCreateOrder = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()

      if (!stripe || !elements) {
        message.error('Stripe не завантажився, спробуйте пізніше')
        setLoading(false)
        return
      }

      if (cardError) {
        message.error('Помилка в даних карти: ' + cardError)
        setLoading(false)
        return
      }

      const res = await createPayment({
        amount: Math.round(totalSum),
        currency: 'usd',
        userId: session?.user?.id,
      })
      const { clientSecret } = await res?.data

      if (!clientSecret) {
        message.error('Помилка створення платежу')
        setLoading(false)
        return
      }

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        message.error('Карта не заповнена')
        setLoading(false)
        return
      }

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: values.name,
            email: session?.user?.email || '',
            phone: values.phone,
            address: {
              line1: values.address,
            },
          },
        },
      })

      if (paymentResult.error) {
        message.error(paymentResult.error.message || 'Оплата не пройшла')
        setLoading(false)
        return
      }

      if (paymentResult.paymentIntent.status === 'succeeded') {
        const goods = cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }))

        await createOrder({
          userId: session?.user?.id,
          goods,
          price: totalSum,
          ...values,
        }).unwrap()

        message.success('Замовлення оформлено!')
        localStorage.removeItem('cartItems')
        setCartItems([])
        setSelectedRowKeys([])
        setIsModalOpen(false)
        form.resetFields()
      } else {
        message.error('Оплата не вдалася')
      }
    } catch (err) {
      console.error('Помилка при оформленні замовлення:', err)
      message.error('Щось пішло не так. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="КОШИК" hoverable extra={DropMenu}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={cartItems}
        pagination={{ pageSize: 5 }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        locale={{ emptyText: 'Кошик пустий' }}
      />
      <Stack spacing={2} style={{ marginTop: 16 }}>
        <h3>Загальна сума: {totalSum} USD</h3>
        <Button type="primary" size="large" style={{ width: '100%' }} onClick={() => setIsModalOpen(true)} disabled={cartItems.length === 0}>
          Оформити замовлення
        </Button>
      </Stack>

      <Modal
        title="Оформлення замовлення"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleCreateOrder}
        okText="Підтвердити"
        cancelText="Відмінити"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Ім’я"
            name="name"
            rules={[{ required: true, message: 'Введіть ім’я' }]}
          >
            <Input placeholder="Ім’я" />
          </Form.Item>
          <Form.Item
            label="Телефон"
            name="phone"
            rules={[{ required: true, message: 'Введіть номер телефону' }]}
          >
            <Input placeholder="+380..." />
          </Form.Item>
          <Form.Item
            label="Адреса доставки"
            name="address"
            rules={[{ required: true, message: 'Введіть адресу доставки' }]}
          >
            <Input.TextArea placeholder="Місто, вулиця, будинок, квартира" rows={3} />
          </Form.Item>
          <Form.Item label="Оплата картою" validateStatus={cardError ? 'error' : ''} help={cardError || ''}>
            <div style={{ border: '1px solid #d9d9d9', padding: '10px', borderRadius: 4 }}>
              <CardElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={(event) => {
                  setCardError(event.error ? event.error.message : null)
                }}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}

export default CartCard
