import {TextField} from '@mui/material';
import {IInput} from './IInput';

const InputUI = ({placeholder}: IInput) => {
    return <TextField placeholder={placeholder} fullWidth={true}/>;
};

export default InputUI;
