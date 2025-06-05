import debounce from 'lodash.debounce'
import React, { useCallback, useContext, useEffect } from 'react'
import { TextField, Stack } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import SearchIcon from '@mui/icons-material/Search'
import FilterContext from '@/app/common/dashboards/Catalog/FilterContext'

const Searcher = () => {
  const { setSearchValue } = useContext(FilterContext)
  const searchParams = useSearchParams()

  const searchBy = searchParams.get('searchBy') || ''
  useEffect(() => {
    setSearchValue(searchBy)
  }, [searchParams])

  const debouncedSetSearchValue = useCallback(
    debounce((val) => {
      setSearchValue(val)
    }, 500),
    []
  )

  return (
    <Stack
      sx={{
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        sx={{ width: '40%' }}
        InputProps={{
          sx: {
            fontSize: '24px',
            '& input': {
              textAlign: 'center',
            },
          },
        }}
        variant="standard"
        placeholder="Пошук"
        onChange={(e) => debouncedSetSearchValue(e.target.value)}
        defaultValue={searchBy || ''}
      />
    </Stack>
  )
}

export default Searcher
