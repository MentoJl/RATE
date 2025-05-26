'use client'

import { use } from "react"
import { useGetProductByIdQuery } from "@/app/routes/goodsApi"

export default function ProductPage(props) {
  const { id } = use(props.params)
  const { data, isLoading, isError } = useGetProductByIdQuery({ _id: id }, { skip: !id })
  console.log('Product ID:', id)

  return (
    <>
      Product page
    </>
  )
}