'use client'

import react, { useState, useContext } from 'react'
import GoodsTable from '@/app/common/components/GoodsTable'
import Searcher from '@/app/common/components/Searcher'
import StoreFilters from '@/app/common/components/StoreFilters'
import { Box } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { Filter } from '@mui/icons-material'
import FilterContext from '@/app/common/dashboards/Catalog/FilterContext'

const CatalogPage = () => {
  const searchParams = useSearchParams()
  const initialSearchValue = searchParams.get('searchBy') || ''

  const [searchValue, setSearchValue] = useState(initialSearchValue)
  const [categoryValue, setCategoryValue] = useState(null)
  const [tagValue, setTagValue] = useState(null)
  const [priceValue, setPriceValue] = useState(null)
  const [productType, setProductType] = useState(null)

  return (
    <Box sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "30px",
      paddingBottom: "20px",
      gap: 3,
    }}>
      <FilterContext.Provider
        value={{
          searchValue,
          setSearchValue,
          categoryValue,
          setCategoryValue,
          tagValue,
          setTagValue,
          priceValue,
          setPriceValue,
          productType,
          setProductType,
        }}
      >
        <Searcher />
        <StoreFilters />
        <GoodsTable />
      </FilterContext.Provider>
    </Box>
  )
}

export default CatalogPage