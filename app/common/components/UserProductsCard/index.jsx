import React, { useState } from 'react'
import {
  Card,
  Image,
  Button,
  Dropdown,
  Table,
  Popconfirm,
  notification,
  Tag,
  Tooltip
} from 'antd'
import {
  DeleteOutlined,
  AppstoreAddOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'
import {
  useGetProductByUserQuery,
  useDeleteGoodsMutation,
} from '@/app/routes/goodsApi'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ProductModal from '@/app/common/components/ProductModal'
import { useCreateGoodsMutation } from "@/app/routes/goodsApi"

export default function UserProductsCard() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [messageApi, contextHolder] = notification.useNotification()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: session } = useSession()
  const [ deleteGoods, { isLoading: isDeleting }] = useDeleteGoodsMutation()
  const [ createGoods, { isLoading: isCreating, }] = useCreateGoodsMutation()

  const { data, refetch } = useGetProductByUserQuery(
    { _id: session?.user?.id },
    { skip: !session?.user?.id }
  )

  const products = data?.items || []

  const handleDeleteProductFromCart = async () => {
    try {
      console.log(selectedRowKeys)
      await Promise.all(selectedRowKeys.map((_id) => deleteGoods({_id}).unwrap()))
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

  const handleConfirmModal = async (newProduct) => {
    console.log('Updated product:', newProduct)
    try {
      const formData = new FormData()

      formData.append('title', newProduct?.title)
      formData.append('userId', session?.user?.id)
      formData.append('category', newProduct?.category)
      formData.append('price', newProduct?.price.toString())
      formData.append('description', newProduct?.description)
    
      formData.append('tags', JSON.stringify(newProduct?.tags))
    
      newProduct?.fileList?.forEach(file => {
        formData.append('images', file.originFileObj || file)
      })
      await createGoods(formData)
      messageApi.success({
        message: 'Товар успішно додано',
        duration: 2,
      })
      refetch()
    } catch (err) {
      messageApi.error({
        message: 'Сталася помилка',
        duration: 2,
      })
    }
    setIsModalOpen(false)
  }

  const handleCancelModal = () => {
    setIsModalOpen(false)
  }

  const columns = [
    {
      title: '',
      dataIndex: 'images',
      width: 70,
      render: (image, record) => (
        <Image preview={false} src={`http://localhost:3001${image}`} alt={record.title} width={50} height={50} />
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
    {
      title: 'Статус товару',
      dataIndex: 'verified',
      width: 180,
      render: (verified) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag color={verified ? 'green' : ''}>
            {verified ? 'ВЕРИФІКОВАНИЙ' : 'НЕ ВЕРИФІКОВАНИЙ'}
          </Tag>
          <Tooltip
            title={
              verified
                ? 'Верифікований товар — це товар, який підтверджено сертифікатом та постачається оригінальним постачальником.'
                : 'Неверифікований товар — це товар, постачається місцевим постачальником.'
            }
          >
            <InfoCircleOutlined style={{ fontSize: '16px', color: '#1677ff', cursor: 'pointer' }} />
          </Tooltip>
        </div>
      ),
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
            onClick: (() => setIsModalOpen(true))
          },
          {
            key: 'delete',
            danger: true,
            icon: <DeleteOutlined style={{ fontSize: '16px' }} />,
            disabled: isDeleting || selectedRowKeys.length === 0,
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
    <Card 
      title="МОЇ ТОВАРИ" 
      hoverable
      extra={DropMenu}
    >
      {contextHolder}
      {session?.user?.role !== 'User' ? (
        <>
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
            create={true}
            visible={isModalOpen}
            onSave={handleConfirmModal}
            onCancel={handleCancelModal}
            product={[]}
          />
        </>
      ) : (
        <div style={{ padding: '1rem', fontSize: '16px' }}>
          Для цієї функції необхідно мати статус продавця
        </div>
      )}
    </Card>
  )
}
