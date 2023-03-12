import React, {FC, useState} from 'react';
import {useAuthUser} from "../../../../entities";
import {CreateShopModal, CreateStorageModal, HeaderUserMenu} from "../../../../features";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import cls from './Header.module.scss'
import {Clock} from "../../../../shared/ui/Clock/Clock";
import {MenuIcon} from "../../../../shared/ui/IconButtons/MenuIcon";
import {NotificationIcon} from "../../../../shared/ui/IconButtons/NotificationIcon";
import {Badge} from "../../../../shared/ui/Badge/Badge";
import {BikeShopPaths} from "../../../../app/routes/paths";
import useCreateStorageModal from "../../../../features/CreateShopStorageModal/CreateStorageModalStore";
import useCreateShopModal from "../../../../features/CreateShopStorageModal/CreateShopModalStore";

export const Header: FC = () => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const user = useAuthUser(s => s.user)
    const shop = useAuthUser(s => s.shop)
    const openShopModal = useCreateShopModal(s => s.setOpenCreateShopModal)
    const openStorageModal = useCreateStorageModal(s => s.setOpenCreateStorageModal)

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const [menuItems1, setMenuItems1] = useState([
        {
            title: 'Архив',
            func: () => {
                navigate(BikeShopPaths.WORKSPACE.SERVICE)
                setIsMenuOpen(false)
            }
        },
        {
            title: 'Архив сервисов',
            func: () => {
                //
            }
        },
        {
            title: 'Архив чеков',
            func: () => {
                navigate(BikeShopPaths.WORKSPACE.NEW_PRODUCTS)
                setIsMenuOpen(false)
            }
        },
    ])

    const [menuItems2, setMenuItems2] = useState([
        {
            title: 'Магазины',
            func: () => {openShopModal(true); setIsMenuOpen(false)}

        },
        {
            title: 'Склады',
            func: () => {openStorageModal(true); setIsMenuOpen(false)}
        },
        {
            title: 'Валюты',
            func: () => {
                //
            }
        },
        {
            title: 'Ед. измерения',
            func: () => {
                //
            }
        },
    ])

    const [menuItems3, setMenuItems3] = useState([
        {
            title: 'Валюта:',
            func: () => {
                //
            }
        },
        {
            title: 'Язык:',
            func: () => {
                //
            }
        },
        {
            title: 'Тема:',
            func: () => {
                //
            }
        },
    ])

    const [menuItems4, setMenuItems4] = useState([
        {
            title: 'Статистика магазина',
            func: () => {
                //
            }
        },
        {
            title: 'Статистика сети',
            func: () => {
                //
            }
        },
        {
            title: 'Общие настройки',
            func: () => {
                //
            }
        },
        {
            title: 'Настройки',
            func: () => {
                //
            }
        },
    ])

    return (
        <div className={cls.appBar}>
            <CreateShopModal/>
            <CreateStorageModal/>

            <div className={cls.content}>
                <div className={cls.leftSide}>
                    <div className={cls.leftSide_burgerMenu}>
                        <div className={cls.burgerMenu_iconButton}>
                            <MenuIcon onClick={() => {setIsMenuOpen(!isMenuOpen)}}/>
                        </div>
                        {
                            isMenuOpen ?
                                <div className={cls.burgerMenu_menuList} >
                                    {menuItems1.map(item => (
                                        <div className={cls.menuList_item}
                                             key={item.title}
                                             onClick={item.func}
                                        >
                                            {item.title}
                                        </div>
                                    ))}
                                    <hr/>

                                    {menuItems2.map(item => (
                                        <div className={cls.menuList_item}
                                             key={item.title}
                                             onClick={item.func}
                                        >
                                            {item.title}
                                        </div>
                                    ))}
                                    <hr/>

                                    {menuItems3.map(item => (
                                        <div className={cls.menuList_item}
                                             key={item.title}
                                             onClick={item.func}
                                        >
                                            {item.title}
                                        </div>
                                    ))}
                                    <hr/>

                                    {menuItems4.map(item => (
                                        <div className={cls.menuList_item}
                                             key={item.title}
                                             onClick={item.func}
                                        >
                                            {item.title}
                                        </div>
                                    ))}
                                </div>

                                : ''
                        }
                    </div>
                    <div className={cls.leftSide_shopTitle}
                         onClick={() => {navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)}}
                    >
                        {shop ? shop.name : 'Магазин не выбран'}
                    </div>
                </div>
                <div className={cls.center}>
                    <Clock/>
                </div>
                <div className={cls.rightSide}>
                    <HeaderUserMenu firstName={user?.firstName} lastName={user?.lastName}/>
                    <Badge badgeContent={3}>
                        <NotificationIcon/>
                    </Badge>
                </div>
            </div>
        </div>
    );
};
