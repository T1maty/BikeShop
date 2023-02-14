import React, {ChangeEvent} from 'react';
import {TextField} from '@mui/material';
import {TextFieldProps} from "@mui/material/TextField/TextField";

type InputUIPropsType = TextFieldProps & {
    placeholder: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputUI: React.FC<InputUIPropsType> = ({placeholder, onChange, ...restProps}) => {
    return <TextField placeholder={placeholder} onChange={onChange} fullWidth={true} {...restProps}/>;
};

export default InputUI;
