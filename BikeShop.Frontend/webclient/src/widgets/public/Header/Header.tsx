import React from 'react';
import {AppBar, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="primary" sx={{p: '25px 45px'}}>
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