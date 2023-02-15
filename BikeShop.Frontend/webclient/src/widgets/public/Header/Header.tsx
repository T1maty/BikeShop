import React from 'react';
import {AppBar, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="primary" style={{height: 'var(--navbar-height)', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Button onClick={() => {
                navigate('/login')
            }}>Вход</Button>
            <Button onClick={() => {
                navigate('/mainpage')
            }}>Главная воркспейса</Button>
        </AppBar>
    );
};

export default Header;
