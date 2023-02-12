import React from 'react';
import Button from '@mui/material/Button';
import {ButtonProps} from '@mui/material/Button/Button';

type DefaultMUIButtonType = ButtonProps

type ButtonUIPropsType = DefaultMUIButtonType & {
    text: string
}

const ButtonUI: React.FC<ButtonUIPropsType> = ({text, ...restProps}) => {

    return (
        <Button
            variant="contained"
            sx={{
                padding: '16px 60px',
                borderRadius: '10px',
            }}
            {...restProps}
        >
            {text}
        </Button>
    );
};

export default ButtonUI;
