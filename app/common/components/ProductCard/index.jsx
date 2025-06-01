import { Stack, Grid } from "@mui/material"
import {
  Image,
  Card,
  Typography,
  Tag,
  InputNumber,
  Button,
  Rate,
  Dropdown,
  notification,
} from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState } from "react"
import ProductModal from '@/app/common/components/ProductModal'

const { Title } = Typography

export default function ProductCard({ item }) {
  const [count, setCount] = useState(1)
  const [messageApi, contextHolder] = notification.useNotification()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddToCart = (productId) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    cartItems.push({
      productId,
      title: item?.data?.title,
      image: item?.data?.image,
      quantity: count,
      price: item?.data?.price,
      totalPrice: item?.data?.price * count,
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    messageApi.success({
      message: 'Товар додано до кошика',
      description: `Кількість: ${count}, Ціна: ${item?.data?.price * count} ${item?.data?.currency}`,
      duration: 2,
    })
  }

  const showEditModal = () => {
    setIsModalOpen(true)
  }

  const handleModalOk = (updatedProduct) => {
    console.log('Updated product:', updatedProduct)
    setIsModalOpen(false)
    messageApi.success({ message: 'Товар оновлено' })
  }

  const handleModalCancel = () => {
    setIsModalOpen(false)
  }

  const DropMenu = {
    items: [
      {
        key: 'edit',
        label: 'Редагувати',
        icon: <EditOutlined />,
        onClick: showEditModal,
      },
    ],
  }

  const ExtrasMenu = (
    <Dropdown menu={DropMenu}>
      <Button>• • •</Button>
    </Dropdown>
  )

  return (
    <>
      {contextHolder}

      <Card
        title={
          <Tag color={item?.data?.verified ? "green" : ''}>
            {item?.data?.verified ? 'ВЕРИФІКОВАНИЙ ТОВАР' : 'НЕ ВЕРИФІКОВАНИЙ ТОВАР'}
          </Tag>
        }
        extra={ExtrasMenu}
      >
        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
          <Grid size={8}>
            <Image
              src={item?.data?.image}
              alt={item?.data?.title}
              width={400}
              height={400}
              preview={false}
              style={{ objectFit: 'contain' }}
            />
          </Grid>
          <Grid size={4} sx={{ width: '70%' }}>
            <Stack spacing={4} direction={'column'}>
              <Title level={1}>{item?.data?.title}</Title>
              <Title type="secondary" level={3}>Категорія: {item?.data?.category}</Title>
              <Title type="secondary" level={4}>Теги: {item?.data?.tags?.join(', ')}</Title>
              <Rate style={{ fontSize: '40px' }} />
              <Title type="danger">{item?.data?.price} {item?.data?.currency}</Title>
              <Button
                type="primary"
                size="large"
                style={{ width: '300px', color: 'white', fontSize: '18px', fontWeight: 'bold' }}
                onClick={() => handleAddToCart(item?.data?._id)}
              >
                Додати до кошика
              </Button>
              <Title level={5}>
                Кількість:
                <InputNumber
                  onChange={(value) => setCount(value)}
                  addonAfter='шт.'
                  defaultValue={1}
                  style={{ width: '150px', marginLeft: '10px' }}
                />
              </Title>
              <Title level={5}>
                Опис:<p /> {item?.data?.description}
              </Title>
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <ProductModal
        visible={isModalOpen}
        onSave={handleModalOk}
        onCancel={handleModalCancel}
        product={{
          title: item?.data?.title,
          price: item?.data?.price,
          description: item?.data?.description,
          category: item?.data?.category,
          tags: item?.data?.tags || [],
          images: item?.data?.images || [item?.data?.image],
        }}
      />
    </>
  )
}
