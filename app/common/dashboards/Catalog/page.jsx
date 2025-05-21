'use client'

import react, { useState, useContext } from 'react'
import GoodsTable from '@/app/common/components/GoodsTable'
import Searcher from '@/app/common/components/Searcher'
import StoreFilters from '@/app/common/components/StoreFilters'
import { Box } from '@mui/material'
import { Filter } from '@mui/icons-material'
import FilterContext from '@/app/common/dashboards/Catalog/FilterContext'

const CatalogPage = () => {

  const [searchValue, setSearchValue] = useState('')
  const [categoryValue, setCategoryValue] = useState('')
  const [tagValue, setTagValue] = useState('')
  const [rateValue, setRateValue] = useState('')
  const [priceValue, setPriceValue] = useState('')

  return (
    <Box sx={{
      width: "100%",
      // border: "1px solid black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // alignContent: "center",
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
          rateValue,
          setRateValue,
          priceValue,
          setPriceValue,
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