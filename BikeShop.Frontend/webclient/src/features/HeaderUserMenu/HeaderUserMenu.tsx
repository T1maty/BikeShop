import React, {useState} from 'react'
import s from './HeaderUserMenu.module.scss'
import {BikeShopPaths} from "../../app/routes/paths"
import {useTranslation} from "react-i18next"
import {useNavigate} from "react-router-dom"
import {useComponentVisible} from "../../shared/hooks/useComponentVisible"

interface HeaderUserMenuProps {
    firstName?: string
    lastName?: string
}

export const HeaderUserMenu = (props: HeaderUserMenuProps) => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

    const [profileMenuItems, setProfileMenuItems] = useState([
        {
            title: 'Профиль',
            func: () => {
                navigate(BikeShopPaths.WORKSPACE.SERVICE)
            }
        },
        {
            title: 'Выйти',
            func: () => {
                navigate(BikeShopPaths.COMMON.LOGIN)
            }
        },
    ])

    return (
        <div className={s.leftSide_burgerMenu}>
            <div className={s.burgerMenu_iconButton}
                 onClick={() => {
                     setIsComponentVisible(!isComponentVisible)
                 }}
            >
                UserName
            </div>
            {
                isComponentVisible ?
                    <div className={s.burgerMenu_menuList} ref={ref}>
                        {profileMenuItems.map(item => (
                            <div className={s.menuList_item}
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
    )
}