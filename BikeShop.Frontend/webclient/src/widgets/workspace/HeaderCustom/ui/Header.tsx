import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import {useAuthUser} from "../../../../entities";
import {HeaderUserMenu} from "../../../../features";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import cls from './Header.module.scss'
import {Clock} from "../../Clock";

export const Header: React.FC = () => {

    const navigate = useNavigate();
    const user = useAuthUser(s => s.user);
    const {t} = useTranslation()


    return (
        <div className={cls.appBar}>
            <div className={cls.content}>
                <div className={cls.leftSide}>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: '20px'}}>
                        <MenuIcon/>
                    </IconButton>
                    <div onClick={() => {navigate('/mainpage')}}>
                        {t('Shop')}
                    </div>
                </div>
                <div className={cls.center}>
                    <Clock/>
                </div>
                <div className={cls.rightSide}>
                    <HeaderUserMenu firstName={user?.firstName} lastName={user?.lastName}/>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Badge badgeContent={3} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};
