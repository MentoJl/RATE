import react, { useContext } from 'react'
import { Box, TextField, Button, Stack } from '@mui/material'
import FilterContext from '@/app/common/dashboards/Catalog/FilterContext'

const Searcher = () => {
  const { searchValue, setSearchValue } = useContext(FilterContext)

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
        sx={{
          width: '40%',
          fontSize: '60px',
        }}
        InputProps={{
          sx: {
            fontSize: '24px',
            '& input': {
              textAlign: 'center',
            },
          },
        }}
        variant="standard"
        placeholder='Пошук'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </Stack>
  )
}

export default Searcher