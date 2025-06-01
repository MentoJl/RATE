import React, { useState } from 'react'
import { 
  Card, 
  Image, 
  Button, 
  Dropdown, 
  Table, 
  Popconfirm, 
  notification,
} from 'antd'
import {
  DeleteOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons'
import { 
  useGetProductByUserQuery,
  useDeleteGoodsMutation,
} from '@/app/routes/goodsApi'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ProductModal from '@/app/common/components/ProductModal'

export default function UserProductsCard() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [messageApi, contextHolder] = notification.useNotification()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: session } = useSession()
  const [deleteGoods, { isLoading: isDeleting }] = useDeleteGoodsMutation()

  const { data, refetch } = useGetProductByUserQuery(
    { _id: session?.user?.id },
    { skip: !session?.user?.id }
  )

  const products = data?.items || []

  const handleDeleteProductFromCart = async () => {
    try {
      // await Promise.all(selectedRowKeys.map((_id) => deleteGoods({_id}).unwrap()))
      setIsModalOpen(true)
      messageApi.success({
        message: 'Товари успішно видалені',
        duration: 2,
      })
      setSelectedRowKeys([])
      refetch()
    } catch (err) {
      messageApi.error({
        message: 'Помилка при видалені товарів',
        duration: 2,
      })
    }
  }

  const handleConfirmModal = () => {
    setIsModalOpen(false)
  }

  const handleCancelModal = () => {
    setIsModalOpen(false)
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
      render: (text, record) => (
        <Link href={`/catalog/${record._id}`} style={{ color: '#1677ff' }}>
          {text}
        </Link>
      ),
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
            key: 'create',
            icon: <AppstoreAddOutlined style={{ fontSize: '16px' }} />,
            disabled: isDeleting,
            label: "Додати товар",
          },
          {
            key: 'delete',
            danger: true,
            icon: <DeleteOutlined style={{ fontSize: '16px' }} />,
            disabled: isDeleting,
            label: (
              <Popconfirm
                title="Видалити обрані товари?"
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

  return (
    <Card title="МОЇ ТОВАРИ" hoverable extra={DropMenu}>
      {contextHolder}
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 5 }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        locale={{ emptyText: 'Поки немає власних товарів' }}
      />
      <ProductModal
        visible={isModalOpen}
        onSave={handleConfirmModal}
        onCancel={handleCancelModal}
        product={[]}
      />
    </Card>
  )
}
