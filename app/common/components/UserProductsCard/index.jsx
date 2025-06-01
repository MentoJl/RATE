import React, { useState, useEffect } from 'react'
import { Card, Image, Button, Dropdown, Modal, Table, Popconfirm, Form, Input } from 'antd'
import { DeleteOutlined } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { useGetProductByUserQuery } from '@/app/routes/goodsApi'
import { useSession } from 'next-auth/react'

export default function UserProductsCard() {
  const [cartItems, setCartItems] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: session } = useSession()
  const [form] = Form.useForm()
  
  const { data } = useGetProductByUserQuery({ _id: session?.user?.id })

  useEffect(() => {
    const items =  []
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
        <Image preview={false} src={image} alt={record.title} width={50} height={50} />
      ),
    },
    {
      title: 'Назва',
      dataIndex: 'title',
      width: 200,
    },
    {
      title: 'Категорія',
      dataIndex: 'category',
      width: 200,
    },
    {
      title: 'Ціна (шт.)',
      dataIndex: 'price',
      width: 100,
      render: (price) => `${price} USD`,
    },
  ]

  const DropMenu = (
    <Dropdown
      menu={{
        items: [
          {
            key: 'delete',
            // label: 'Видалити',
            // danger: true,
            // icon: <DeleteOutlined/>,
            // onClick: handleDeleteProductFromCart,
            label: (
              <Popconfirm
                title="Видалити обрані товари?"
                onConfirm={handleDeleteProductFromCart}
                okText="Так"
                cancelText="Ні"
              >
                <Button danger icon={<DeleteOutlined />} disabled={selectedRowKeys.length === 0}>
                  Видалити
                </Button>
              </Popconfirm>
            ),
          },
        ],
      }}
    >
      <Button>• • •</Button>
    </Dropdown>
  )

  const handleCreateOrder = async () => {
    
  }

  return (
    <Card title="МОЇ ТОВАРИ" hoverable extra={DropMenu}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={cartItems}
        pagination={{ pageSize: 5 }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        locale={{ emptyText: 'Поки немає власних товарів' }}
      />
    </Card>
  )
}