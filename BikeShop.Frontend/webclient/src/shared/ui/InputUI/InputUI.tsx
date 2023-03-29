import React, {ChangeEvent} from 'react';
import {TextField} from '@mui/material';
import {TextFieldProps} from "@mui/material/TextField/TextField";
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import InputAdornment from '@mui/material/InputAdornment'

type InputUIPropsType = TextFieldProps & {
    placeholder: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    clearInputValue: () => void
}

export const InputUI: React.FC<InputUIPropsType> = ({placeholder, onChange, clearInputValue, ...restProps}) => {
    return (
        <TextField placeholder={placeholder}
                   onChange={onChange}
                   fullWidth={true}
                   {...restProps}

                   InputProps={{
                       startAdornment: (
                           <InputAdornment position="start">
                               <SearchIcon/>
                           </InputAdornment>
                       ),
                       endAdornment: (
                           <InputAdornment position="end" style={{cursor: 'pointer'}}>
                               <ClearIcon onClick={() => clearInputValue()}/>
                           </InputAdornment>
                       ),
                   }}
        />
    )
}