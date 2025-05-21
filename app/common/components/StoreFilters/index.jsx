import react, { useContext } from 'react'
import { Box, TextField, Button, Stack } from '@mui/material'
import { Select, Typography } from 'antd'
import FilterContext from '@/app/common/dashboards/Catalog/FilterContext'

const StoreFilters = () => {

  const { Title } = Typography

  const { 
    setCategoryValue, 
    setTagValue,
    setRateValue,
    setPriceValue,
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
          Теги
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
          Рейтинг
        </Title>
        <Select
          style={{ width: '100%', minWidth: '100px' }}
          allowClear
          placeholder={'Всі'}
          options={[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
          ]}
        />
      </Stack>
    </Stack>
  )
}

export default StoreFilters