import React, { useState, useContext } from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Chip,
  Pagination,
  Box,
  Stack,
  Tooltip,
} from '@mui/material'
import { Grid } from '@mui/system'
import { Image } from 'antd'
import { useGetAllGoodsQuery, useCreateGoodsMutation } from '@/app/routes/goodsApi'
import FilterContext from '@/app/common/dashboards/Catalog/FilterContext'
import { useRouter } from 'next/navigation'

const GoodsTable = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [createGoods] = useCreateGoodsMutation()
  const { searchValue, categoryValue, priceValue, productType } = useContext(FilterContext)
  console.log(searchValue)

  const { data, isLoading, isError } = useGetAllGoodsQuery({
    search: searchValue,
    category: categoryValue,
    price: priceValue,
    productType: productType,
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || []

  const handleChangePage = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <Box
      sx={{
        width: '80%',
        px: 4,
        py: 4,
        borderRadius: 4,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {currentItems?.map((item) => (
          <Grid item key={item._id}>
            <CardActionArea onClick={() => router.push(`/catalog/${item._id}`)}>
              <Card
                sx={{
                  width: 280,
                  height: 450,
                  borderRadius: 4,
                  boxShadow: 6,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    gap: 2.5,
                    p: 2,
                  }}
                >
                  {item.images && item.images.length > 0 ? (
                    <Image
                      src={`http://localhost:3001${item.images[0]}`}
                      alt={item.title}
                      width={200}
                      height={200}
                      preview={false}
                      style={{ borderRadius: '12px', objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 200,
                        height: 200,
                        borderRadius: '12px',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                      }}
                    >
                      No Image
                    </Box>
                  )}
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: 600, color: '#333' }}
                  >
                    {item.title}
                  </Typography>
                  <Chip
                    label={item.category}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                    justifyContent="center"
                  >
                    {item.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ bgcolor: '#e8f5e9' }}
                      />
                    ))}
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <Typography variant="h6" fontWeight="bold" color="#1976d2">
                      {item.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.currency}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(data?.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  )
}

export default GoodsTable
