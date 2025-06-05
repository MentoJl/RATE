'use client'
import { useContext, useEffect } from 'react'
import { Box, Typography, Stack, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import FilterContext from '@/app/common/dashboards/Catalog/FilterContext'
import { useSearchParams } from 'next/navigation'

const StoreFilters = () => {
  const {
    setCategoryValue,
    setTagValue,
    setPriceValue,
    setProductType
  } = useContext(FilterContext)
  const searchParams = useSearchParams()

  const searchBy = searchParams.get('category') || ''
  console.log(searchBy)
  useEffect(() => {
    setCategoryValue(searchBy)
  }, [searchParams])

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 300,
        backgroundColor: '#fff',
        borderRadius: 3,
        boxShadow: 3,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="text.primary">
        Фільтри
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="category-label">Категорія</InputLabel>
        <Select
          labelId="category-label"
          defaultValue={searchBy}
          onChange={(e) => setCategoryValue(e.target.value)}
          label="Категорія"
        >
          <MenuItem value="">Всі</MenuItem>
          <MenuItem value="FOOD">Їжа</MenuItem>
          <MenuItem value="HOMEMADE">Домашні</MenuItem>
          <MenuItem value="SPORT">Спорт</MenuItem>
          <MenuItem value="ELECTRONICS">Електроніка</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="price-label">Ціна</InputLabel>
        <Select
          labelId="price-label"
          defaultValue=""
          onChange={(e) => setPriceValue(e.target.value)}
          label="Ціна"
        >
          <MenuItem value="">Без ліміту</MenuItem>
          <MenuItem value={50}>До 50 EUR</MenuItem>
          <MenuItem value={100}>До 100 EUR</MenuItem>
          <MenuItem value={1000}>До 1000 EUR</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="product-type-label">Тип товару</InputLabel>
        <Select
          labelId="product-type-label"
          defaultValue=""
          onChange={(e) => setProductType(e.target.value)}
          label="Тип товару"
        >
          <MenuItem value="">Всі</MenuItem>
          <MenuItem value={false}>Не Верифіковані</MenuItem>
          <MenuItem value={true}>Верифіковані</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default StoreFilters
