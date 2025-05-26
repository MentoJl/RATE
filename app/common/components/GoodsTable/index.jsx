import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Card, CardContent, CardActionArea, Typography, Chip, Pagination, Box, Stack } from '@mui/material'
import { Grid } from '@mui/system'
import { Image } from 'antd'
import {
  useGetAllGoodsQuery,
  useCreateGoodsMutation
} from '@/app/routes/goodsApi'
import FilterContext from '@/app/common/dashboards/Catalog/FilterContext'
import { useRouter } from 'next/navigation'

const GoodsTable = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [createGoods] = useCreateGoodsMutation()
  const { 
    searchValue,
    categoryValue,
    priceValue,
    productType,
  } = useContext(FilterContext)

  useEffect(() => {
    console.log('Search Value:', categoryValue, priceValue, productType)
  }, [categoryValue, priceValue, productType])

  const { data, isLoading, isError } = useGetAllGoodsQuery({
    search: searchValue,
    category: categoryValue,
    price: priceValue,
    productType: productType,
  })

  // useEffect(() => {
  //   console.log('Data:', data)
  //   createGoods({ title: "ghj" })
  // }, [data, isLoading, isError])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || []

  const handleChangePage = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <Box sx={{ 
      width: "90%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      <Grid container spacing={3} justifyContent="center">
        {currentItems?.map((item) => (
          <Grid item key={item._id}>
            <Card sx={{ width: 280, height: 420 }}>
            <CardActionArea
              onClick={() => router.push(`/catalog/${item._id}`)}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  gap: 2.5,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  preview={false}
                  style={{ borderRadius: '10px' }}
                />
                <Typography variant="h6" align="center">
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 'bold' }}
                >
                  {item.category}
                </Typography>
                <Box>
                  {item.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{ marginInline: 0.5 }}
                    />
                  ))}
                </Box>
                <Stack direction="row" alignItems="center">
                  <Typography variant="h6" fontWeight="bold">
                    {item.price} {item.priceType}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(data?.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  )
}

export default GoodsTable