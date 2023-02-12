import React from 'react';
import Button from '@mui/material/Button';

type ButtonUIPropsType = {
    text: string
    onClick: () => void
}

const ButtonUI: React.FC<ButtonUIPropsType> = ({text, onClick}) => {

    const buttonClickHandler = () => {
        onClick();
    }

    return (
        <Button
            variant="contained"
            sx={{
                padding: '16px 60px',
                borderRadius: '10px',
            }}
            onClick={buttonClickHandler}
        >
            {text}
        </Button>
    );
};

export default ButtonUI;
