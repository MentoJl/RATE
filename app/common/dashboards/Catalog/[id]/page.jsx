'use client'

import { use } from "react"
import { Stack, Grid2, Item } from "@mui/material"
import ProductCard from "@/app/common/components/ProductCard"

export default function ProductPage(props) {
  const { id } = use(props.params)

  return (
    <Stack
      spacing={4}
      sx={{
        margin: "20px",
        flexGrow: 1,
      }}
    >
      <ProductCard _id={id}/>
    </Stack>
  )
}