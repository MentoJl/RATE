'use client'

import react, { useState } from 'react'
import GoodsTable from '@/app/common/components/GoodsTable'
import { Box } from '@mui/material'

const CatalogPage = () => {
  return (
    <Box sx={{
      width: "100%",
      // border: "1px solid black",
      display: "flex",
      alignItems: "center",
      // alignContent: "center",
      justifyContent: "center",
      paddingTop: "30px",
      paddingBottom: "20px"
    }}>
      <GoodsTable/>
    </Box>
  )
}

export default CatalogPage