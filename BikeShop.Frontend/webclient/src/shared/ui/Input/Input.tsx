import React from 'react';
import {TextField} from '@mui/material';

type InputUIPropsType = {
    placeholder: string
}

const InputUI: React.FC<InputUIPropsType> = ({placeholder}) => {
    return <TextField placeholder={placeholder} fullWidth={true}/>;
};

export default InputUI;
