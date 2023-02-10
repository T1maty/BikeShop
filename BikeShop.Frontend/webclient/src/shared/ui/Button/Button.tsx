import Button from '@mui/material/Button';
import {IButton} from './IButton';

const ButtonUI = ({text, onClick}: IButton) => {

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
