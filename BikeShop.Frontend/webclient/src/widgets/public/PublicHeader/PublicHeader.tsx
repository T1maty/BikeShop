import React from 'react';
import {AppBar, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {BikeShopPaths} from "../../../app/routes/paths";

export const PublicHeader = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="primary" style={{height: 'var(--navbar-height)', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Button onClick={() => {navigate(BikeShopPaths.COMMON.LOGIN)}}>
                Вход
            </Button>
            <Button onClick={() => {navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)}}>
                Главная воркспейса
            </Button>
        </AppBar>
    );
};