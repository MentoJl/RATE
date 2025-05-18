import React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Chip, Pagination, Box, Stack } from '@mui/material'
import { Grid } from '@mui/system'
import { Image } from 'antd'
import {
  useGetAllGoodsQuery,
  useCreateGoodsMutation
} from '@/app/routes/goodsApi'

const GoodsTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [createGoods] = useCreateGoodsMutation()

  const { data, isLoading, isError } = useGetAllGoodsQuery()

  useEffect(() => {
    console.log('Data:', data)
    createGoods({ title: "ghj" })
  }, [data, isLoading, isError])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem)

  const handleChangePage = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <Box sx={{ 
      width: "95%",
      border: "1px solid black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      <Grid container spacing={2}>
        {currentItems?.map((item) => (
          <Grid item key={item._id} sx={{ border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Card style={{ height: '400px', width: "300px" }}>
              <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Image src={item.image} width={200} height={200} preview={false} />
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'pointer' }}>{item.category}</Typography>
                <Box>
                  {item.tags.map((tag, index) => (
                    <Chip key={index} label={tag} style={{ margin: '5px', cursor: 'pointer' }} />
                  ))}
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h6" fontWeight="bold">
                    {item.price} {item.priceType}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      fghhfggfhhgff
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