import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Card, CardContent, Typography, Chip, Pagination, Box, Stack } from '@mui/material'
import { Grid } from '@mui/system'
import { Image } from 'antd'
import {
  useGetAllGoodsQuery,
  useCreateGoodsMutation
} from '@/app/routes/goodsApi'
import FilterContext from '@/app/common/dashboards/Catalog/FilterContext'

const GoodsTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [createGoods] = useCreateGoodsMutation()
  const { searchValue } = useContext(FilterContext)

  useEffect(() => {
    console.log('Search Value:', searchValue)
  }, [searchValue])

  const { data, isLoading, isError } = useGetAllGoodsQuery({
    searchValue: searchValue,
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