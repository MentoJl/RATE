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
  Tooltip,
} from 'antd'
import { 
  EditOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'
import { useState } from "react"
import ProductModal from '@/app/common/components/ProductModal'
import { useEditGoodsMutation } from "@/app/routes/goodsApi"
import { useSession } from "next-auth/react"
import { useGetProductByIdQuery } from "@/app/routes/goodsApi"

const { Title } = Typography

export default function ProductCard({ _id, rate }) {
  const [count, setCount] = useState(1)
  const [messageApi, contextHolder] = notification.useNotification()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { session } = useSession()
  const [ editGoods, { isEditing, }] = useEditGoodsMutation()
  const { data: item, isLoading, isError, refetch } = useGetProductByIdQuery({ _id: _id }, { skip: !_id })
  
  const handleAddToCart = (productId) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    cartItems.push({
      productId,
      title: item?.data?.title,
      image: item?.data?.images[0],
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

  const handleModalOk = async (updatedProduct) => {
    const formData = new FormData()
    formData.append('_id', item?.data?._id)
    formData.append('title', updatedProduct?.title)
    formData.append('userId', session?.user?._id)
    formData.append('category', updatedProduct?.category)
    formData.append('price', updatedProduct?.price.toString())
    formData.append('description', updatedProduct?.description)
  
    formData.append('tags', JSON.stringify(updatedProduct?.tags))
  
    updatedProduct?.fileList?.forEach(file => {
      formData.append('images', file.originFileObj || file)
    })
    await editGoods(formData)
    setIsModalOpen(false)
    refetch()
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
          <>
            <Tag color={item?.data?.verified ? "green" : ''}>
              {item?.data?.verified ? 'ВЕРИФІКОВАНИЙ ТОВАР' : 'НЕ ВЕРИФІКОВАНИЙ ТОВАР'}
            </Tag>
            <Tooltip
              title={
                item?.data?.verified
                  ? 'Верифікований товар — це товар, який підтверджено сертифікатом та постачається оригінальним постачальником.'
                  : 'Неверифікований товар — це товар, постачається місцевим постачальником.'
              }
            >
              <InfoCircleOutlined style={{ fontSize: '16px', color: '#1677ff', cursor: 'pointer' }} />
            </Tooltip>
          </>
        }
        extra={ExtrasMenu}
      >
        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
          <Grid size={8}>
            <Image
              src={`http://localhost:3001${item?.data?.images[0]}`}
              alt={item?.data?.title}
              width={400}
              height={400}
              // preview={false}
              style={{ objectFit: 'contain' }}
            />
          </Grid>
          <Grid size={4} sx={{ width: '70%' }}>
            <Stack spacing={4} direction={'column'}>
              <Title level={1}>{item?.data?.title}</Title>
              <Title type="secondary" level={3}>Категорія: {item?.data?.category}</Title>
              <Title type="secondary" level={4}>Теги: {item?.data?.tags?.join(', ')}</Title>
              <Rate style={{ fontSize: '40px' }} value={rate} disabled allowHalf />
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
