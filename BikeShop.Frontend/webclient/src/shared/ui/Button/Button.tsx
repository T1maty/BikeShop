import React from 'react';
import Button from '@mui/material/Button';
import {ButtonProps} from '@mui/material/Button/Button';

type DefaultMUIButtonType = ButtonProps

type ButtonUIPropsType = DefaultMUIButtonType & {
    text: string
    // onClick: () => void
}

const ButtonUI: React.FC<ButtonUIPropsType> = ({text, ...restProps}) => {

    // const buttonClickHandler = () => {
    //     onClick();
    // }

    return (
        <Button
            variant="contained"
            sx={{
                padding: '16px 60px',
                borderRadius: '10px',
            }}
            // onClick={buttonClickHandler}
            {...restProps}
        >
            {text}
        </Button>
    );
};

export default ButtonUI;
