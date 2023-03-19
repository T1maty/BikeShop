import React, {FC, useState} from 'react'
import {useAuthUser} from "../../../../entities"
import {
    CreateCurrencyModal, CreateQuantityUnitModal,
    CreateShopModal, CreateStorageModal,
    HeaderUserMenu} from "../../../../features"
import {useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next"
import cls from './Header.module.scss'
import {Clock} from "../../../../shared/ui/Clock/Clock"
import {MenuIcon} from "../../../../shared/ui/IconButtons/MenuIcon"
import {NotificationIcon} from "../../../../shared/ui/IconButtons/NotificationIcon"
import {Badge} from "../../../../shared/ui/Badge/Badge"
import {BikeShopPaths} from "../../../../app/routes/paths"
import useCreateStorageModal from "../../../../features/CreateStorageModal/CreateStorageModalStore"
import useCreateShopModal from "../../../../features/CreateShopModal/CreateShopModalStore"
import useCreateCurrencyModal from "../../../../features/CreateCurrencyModal/CreateCurrencyModalStore"
import useCreateQuantityUnitModal from "../../../../features/CreateQuantityUnitModal/CreateQuantityUnitModalStore"

export const Header: FC = () => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const user = useAuthUser(s => s.user)
    const shop = useAuthUser(s => s.shop)
    const openShopModal = useCreateShopModal(s => s.setOpenCreateShopModal)
    const openStorageModal = useCreateStorageModal(s => s.setOpenCreateStorageModal)
    const openCurrencyModal = useCreateCurrencyModal(s => s.setOpenCreateCurrencyModal)
    const openQuantityUnitModal = useCreateQuantityUnitModal(s => s.setOpenCreateQuantityUnitModal)

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
                navigate(BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS)
                setIsMenuOpen(false)
            }
        },
        {
            title: 'Архив чеков',
            func: () => {
                navigate(BikeShopPaths.WORKSPACE.INVENTORY_OF_PRODUCTS)
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
            func: () => {openCurrencyModal(true); setIsMenuOpen(false)}
        },
        {
            title: 'Ед. измерения',
            func: () => {openQuantityUnitModal(true); setIsMenuOpen(false)}
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
            <CreateCurrencyModal/>
            <CreateQuantityUnitModal/>

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
