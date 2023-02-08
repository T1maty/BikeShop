import React from 'react';
import {AppBar, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigte = useNavigate();
    return (
        <AppBar position="static" color="primary" sx={{p: '25px 45px'}}>
            <Button onClick={() => {
                navigte('/login')
            }}>Вход</Button>
            <Button onClick={() => {
                navigte('/mainpage')
            }}>Главная воркспейса</Button>
        </AppBar>
    );
};

export default Header;