import React, {FC} from 'react';
import {useAuthUser} from "../../../../entities";
import {HeaderUserMenu} from "../../../../features";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import cls from './Header.module.scss'
import {Clock} from "../../../../shared/ui/Clock/Clock";
import {MenuIcon} from "../../../../shared/ui/IconButtons/MenuIcon";
import {NotificationIcon} from "../../../../shared/ui/IconButtons/NotificationIcon";
import {Badge} from "../../../../shared/ui/Badge/Badge";

export const Header: FC = () => {

    const navigate = useNavigate();
    const user = useAuthUser(s => s.user);
    const {t} = useTranslation()

    return (
        <div className={cls.appBar}>
            <div className={cls.content}>
                <div className={cls.leftSide}>
                    <MenuIcon/>
                    <div onClick={() => {
                        navigate('/mainpage')
                    }}>
                        {t('Shop')}
                    </div>
                </div>
                <div className={cls.center}>
                    <Clock/>
                </div>
                <div className={cls.rightSide}>
                    <HeaderUserMenu firstName={user?.firstName} lastName={user?.lastName}/>
                    <Badge badgeContent={3}>
                        <NotificationIcon />
                    </Badge>
                </div>
            </div>
        </div>
    );
};
