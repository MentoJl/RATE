'use client'

import { useState, use } from "react"
import { Stack, Grid2, Item } from "@mui/material"
import ProductCard from "@/app/common/components/ProductCard"
import CommentsTable from '@/app/common/components/CommentsTable'

export default function ProductPage(props) {
  const { id } = use(props.params)
  const [avarageRate, setAvarageRate] = useState(null)

  return (
    <Stack
      spacing={4}
      sx={{
        margin: "20px",
        flexGrow: 1,
      }}
    >
      <ProductCard _id={id} rate={avarageRate}/>
      <CommentsTable productId={id} setAvarageRate={setAvarageRate}/>
    </Stack>
  )
}