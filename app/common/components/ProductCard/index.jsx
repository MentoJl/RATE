import { Stack, Grid, Item } from "@mui/material"
import { 
  Image, 
  Card, 
  Typography, 
  Tag, 
  InputNumber, 
  Button,
  Rate,
  notification
} from 'antd'
import { useState } from "react"

export default function ProductCard({ item }) {
  const [count, setCount] = useState(1)
  const [messageApi, contextHolder] = notification.useNotification()

  const { Text, Title } = Typography

  const handleAddToCart = (productId) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    cartItems.push({
      productId,
      title: item?.data?.title,
      image: item?.data?.image,
      quantity: count,
      price: item?.data?.price * count,
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    messageApi['success']({
      message: 'Товар додано до кошика',
      description: `Кількість/n: ${count}, Ціна: ${item?.data?.price * count} ${item?.data?.currency}`,
      duration: 2,
    })
    console.log('Cart items:', JSON.parse(localStorage.getItem('cartItems')))
  }

  return (
    <Card
      title={
      <Tag>
        {item?.data?.verified 
        ? 'ВЕРИФІКОВАНИЙ ТОВАР' 
        : 'НЕ ВЕРИФІКОВАНИЙ ТОВАР'}
        </Tag>}
      extra={'Hello'}
    >
      {contextHolder}
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          // border: '1px solid black',
        }}
      >
        <Grid
          size={8}
        >
          <Image
            src={item?.data?.image}
            alt={item?.data?.title}
            width={400}
            height={400}
            preview={false}
            style={{ 
              objectFit: 'contain',
              // border: '1px solid black',
            }}
          />
        </Grid>
        <Grid
          size={4}
          sx={{
            // border: '1px solid black',
            width: '70%',
          }}
        >
          <Stack
            spacing={4}
            italic="true"
            direction={'column'}
          >
            <Title level={1} strong>
              {item?.data?.title}
            </Title>
            <Title
              type="secondary" 
              level={3}
              style={{
                marginLeft: '1%'
              }}
            >
              Категорія: {item?.data?.category}
            </Title>
            <Title 
              type="secondary"
              level={4}
              style={{
                marginLeft: '1%'
              }}
            >
              Теги: {item?.data?.tags?.join(', ')}
            </Title>
            <Rate
              style={{
                fontSize: '40px'
              }}
            />
            <Title type="danger" strong>
              {item?.data?.price} {item?.data?.currency}
            </Title>
            <Button 
              type="primary" 
              size="large"
              style={{
                width: '300px',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              onClick={() => handleAddToCart(item?.data?._id)}
            >
              Додати до кошика
            </Button>
            <Title
              level={5}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              Кількість: 
              <InputNumber
                onChange={(value) => setCount(value)}
                addonAfter='шт.'
                defaultValue={1}
                style={{ 
                  width: '150px',
                  marginLeft: '10px', 
                }}
              />
            </Title>
            <Title
              strong
              level={5}
              sx={{
                maxWidth: '600px',
              }}
            >
              Опис:<p/> {item?.data?.description}
            </Title>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  )
}