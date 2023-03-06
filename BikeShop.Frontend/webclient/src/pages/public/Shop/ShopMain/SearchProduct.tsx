import React from 'react'
import {TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

type SearchProductProps = {
    sx?: any
}

export const SearchProduct: React.FC<SearchProductProps> = ({sx}) => {

    return (
        <div>
            <TextField
                sx={sx}
                id="outlined-basic"
                variant="outlined"
                size="small"
                style={{ height: '38px', width: '400px' }}
                placeholder={'Поиск товара'}
                // value={search || ''}
                // onChange={searchHandler}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end" style={{ cursor: 'pointer' }}>
                            <ClearIcon onClick={() => {}} />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}