import react, { useState, useEffect } from 'react'
import { Card } from 'antd'

const CartCard = () => {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || []
    setCartItems(items)
  }, [])

  return (
    <Card 
    title={"КОШИК"} 
    hoverable
    style={{
      height: '800px',
    }}>

    </Card>
  )
}

export default CartCard