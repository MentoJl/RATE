import react, { useState, useEffect } from 'react'
import { Card, Image, Button } from 'antd'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Stack } from '@mui/material'
import { useCreateOrderMutation } from '@/app/routes/orderApi'
import { useSession } from 'next-auth/react'

const CartCard = () => {

  const [cartItems, setCartItems] = useState([])
  const paginationModel = { page: 0, pageSize: 10 }
  const [createOrder, { isLoading, error }] = useCreateOrderMutation()
  const { data: session } = useSession()

  const handleCreateOrder = async () => {
    const goods = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }))
  
    const totalSum = cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
  
    try {
      await createOrder({
        userId: session?.user?.id,
        goods, 
        totalSum 
      }).unwrap()
      alert('Замовлення оформлено!')
      localStorage.removeItem('cartItems')
    } catch (err) {
      console.error('Помилка при оформленні замовлення:', err)
      alert('Щось пішло не так. Спробуйте ще раз.')
    }
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || []
    setCartItems(items)
    console.log('Cart items:', items)
  }, [])

  return (
    <Card 
    title={"КОШИК"} 
    hoverable
    >
      <DataGrid
        rows={cartItems.map((item, index) => ({ ...item, id: index }))}
        columns={[
          { field: 'image', headerName: '', width: 70, renderCell: (params) => (
            <Image preview={false} src={params.value} alt={params.row.title} width={50} height={50} />
          )},
          { field: 'title', headerName: 'Назва', width: 200 },
          { field: 'quantity', headerName: 'Кількість', width: 100 },
          { field: 'price', headerName: 'Ціна (шт.)', width: 100 },
          { field: 'totalPrice', headerName: 'Сума', width: 100 },
        ]}
        checkboxSelection
        initialState={{ pagination: { paginationModel } }}
      />
      <Stack>
        <h3>Загальна сума: {cartItems.reduce((total, item) => total + item.totalPrice, 0)} USD</h3>
        <Button type='primary' size='large' style={{ width: '100%' }} onClick={() => handleCreateOrder()}>
          Оформити замовлення
        </Button>
      </Stack>
    </Card>
  )
}

export default CartCard