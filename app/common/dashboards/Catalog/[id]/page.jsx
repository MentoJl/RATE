'use client'

import { use } from "react"
import { useGetProductByIdQuery } from "@/app/routes/goodsApi"
import { Stack, Grid2, Item } from "@mui/material"
import { Image, Card, Typography } from 'antd'
import ProductCard from "@/app/common/components/ProductCard"

export default function ProductPage(props) {
  const { id } = use(props.params)
  const { data: item, isLoading, isError } = useGetProductByIdQuery({ _id: id }, { skip: !id })

  return (
    <Stack
      spacing={4}
      sx={{
        margin: "20px",
        flexGrow: 1,
      }}
    >
      <ProductCard item={item}/>
    </Stack>
  )
}