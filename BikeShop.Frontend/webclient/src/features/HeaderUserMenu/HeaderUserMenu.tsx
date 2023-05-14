import React, {useState} from 'react'
import s from './HeaderUserMenu.module.scss'
import {BikeShopPaths} from "../../app/routes/paths"
import {useTranslation} from "react-i18next"
import {useNavigate} from "react-router-dom"
import {useComponentVisible} from "../../shared/hooks/useComponentVisible"
import {useAuth, User} from '../../entities'
import useUserRoleModal from "../UserRoleModal/UserRoleModalStore"
import {UserRoleModal} from "../UserRoleModal/UserRoleModal"

interface HeaderUserMenuProps {
    user: User
}

export const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({user}) => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)
    const logout = useAuth(s => s.logout)
    const openUserRoleModal = useUserRoleModal(s => s.setOpenUserRoleModal)

    const [profileMenuItems, setProfileMenuItems] = useState([
        {
            title: 'Магазин',
            func: () => {
                navigate(BikeShopPaths.SHOP.HOME)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Профиль',
            func: () => {
                navigate(BikeShopPaths.WORKSPACE.PROFILE)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Админ',
            func: () => {
                navigate(BikeShopPaths.WORKSPACE.ADMIN)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Должности',
            func: () => {
                openUserRoleModal(true)
                setIsComponentVisible(false)
            }
        },
        {
            title: 'Выйти',
            func: () => {
                logout().then()
                navigate(BikeShopPaths.COMMON.LOGIN)
                setIsComponentVisible(false)
            }
        },
    ])

    console.log('сотрудник магазина', user)

    return (
        <div className={s.leftSide_burgerMenu}>

            <UserRoleModal/>

            <div className={s.burgerMenu_iconButton}
                 onClick={() => {setIsComponentVisible(!isComponentVisible)}}
            >
                {user.lastName === null ? 'Новый ' : user.lastName} {user.firstName === null ? 'сотрудник' : user.firstName}
            </div>
            {
                isComponentVisible ?
                    <div className={s.burgerMenu_menuList} ref={ref}>
                        {
                            profileMenuItems.map(item => (
                                <div className={s.menuList_item}
                                     key={item.title}
                                     onClick={item.func}
                                >
                                    {item.title}
                                </div>
                            ))
                        }
                    </div>

                    : ''
            }
        </div>
    )
}