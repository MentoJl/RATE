import react, { useContext } from 'react'
import { Box, TextField, Button, Stack } from '@mui/material'
import { Select, Typography } from 'antd'
import FilterContext from '@/app/common/dashboards/Catalog/FilterContext'

const StoreFilters = () => {

  const { Title } = Typography

  const { 
    setCategoryValue, 
    setTagValue,
    setPriceValue,
    setProductType
  } = useContext(FilterContext)

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100px",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          width: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Title
          level={5}
          style={{
            color: 'gray',
          }}
        >
          Категорії
        </Title>
        <Select
          style={{ width: '100%', minWidth: '100px' }}
          allowClear
          placeholder={'Всі'}
          options={[
            { value: 'clothes', label: 'Одяг' },
            { value: 'shoes', label: 'Взуття' },
            { value: 'accessories', label: 'Аксесуари' },
          ]}
          onChange={(value) => setCategoryValue(value)}
        />
      </Stack>
      <Stack
        sx={{
          width: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Title
          level={5}
          style={{
            color: 'gray',
          }}
        >
          Ціна
        </Title>
        <Select
          style={{ width: '100%', minWidth: '100px' }}
          allowClear
          placeholder={'Без ліміту'}
          options={[
            { value: 50, label: 'До 50 EUR' },
            { value: 100, label: 'До 100 EUR' },
            { value: 1000, label: 'До 1000 EUR' },
          ]}
          onChange={(value) => setPriceValue(value)}
        />
      </Stack>
      <Stack
        sx={{
          width: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Title
          level={5}
          style={{
            color: 'gray',
          }}
        >
          Тип товару
        </Title>
        <Select
          style={{ width: '100%', minWidth: '100px' }}
          allowClear
          placeholder={'Всі'}
          options={[
            { value: 'NonVerificated', label: 'Не Верифіковані' },
            { value: 'Verificated', label: 'Верифіковані' },
          ]}
          onChange={(value) => setProductType(value)}
        />
      </Stack>
    </Stack>
  )
}

export default StoreFilters