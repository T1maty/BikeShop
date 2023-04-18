import React, {useState} from 'react'
import s from './BurgerMenu.module.scss'
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import ShopLogo from "../../../../shared/assets/shop/icons/ShopLogo.svg"
import CatalogIcon from "../../../../shared/assets/shop/icons/catalog-icon-01.svg"
import PhotosIcon from "../../../../shared/assets/shop/icons/photos-icon-01.svg"
import ContactsIcon from "../../../../shared/assets/shop/icons/contacts-icon-01.svg"
import LanguageIcon from "../../../../shared/assets/shop/icons/language-icon-white.svg"
import ProfileIcon from '../../../../shared/assets/shop/icons/profile-icon-02-white.svg'
import LoginIcon from '../../../../shared/assets/shop/icons/login-icon-02-white.svg'

interface BurgerMenuProps {
    menuActive: any
    setMenuActive: (value: boolean) => void
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({menuActive, setMenuActive}) => {

    const navigate = useNavigate()

    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            icon: ShopLogo,
            title: 'Главная',
            func: () => {
                navigate(BikeShopPaths.SHOP.HOME)
                setMenuActive(false)
            }
        },
        {
            id: 2,
            icon: CatalogIcon,
            title: 'Каталог',
            func: () => {
                navigate(BikeShopPaths.SHOP.CATALOG)
                setMenuActive(false)
            }
        },
        {
            id: 3,
            icon: PhotosIcon,
            title: 'Фотографии',
            func: () => {
                // navigate(BikeShopPaths.SHOP.CATALOG)
                setMenuActive(false)
            }
        },
        {
            id: 4,
            icon: ContactsIcon,
            title: 'Контакты',
            func: () => {
                // navigate(BikeShopPaths.SHOP.CATALOG)
                setMenuActive(false)
            }
        },
        {
            id: 5,
            icon: LanguageIcon,
            title: 'Язык',
            func: () => {
                // navigate(BikeShopPaths.SHOP.CATALOG)
                setMenuActive(false)
            }
        },
        {
            id: 6,
            icon: ProfileIcon,
            title: 'Профиль',
            func: () => {
                // navigate(BikeShopPaths.SHOP.CATALOG)
                setMenuActive(false)
            }
        },
        {
            id: 7,
            icon: LoginIcon,
            title: 'Выход',
            func: () => {
                // navigate(BikeShopPaths.SHOP.CATALOG)
                setMenuActive(false)
            }
        },
    ])

    return ( menuActive &&
        <div className={menuActive ? s.burgerMenu_box_active : s.burgerMenu_box}
             onClick={() => {setMenuActive(false)}}
        >
            <div className={s.burgerMenu_blur}/>
            <div className={s.burgerMenu_content} onClick={(e) => {e.stopPropagation()}}>
                <div className={s.burgerMenu_title}>
                    BikeShop
                </div>
                <div className={s.burgerMenu_items}>
                    {
                        menuItems.map(el => {
                            return (
                                <div key={el.id} className={s.menu_item} onClick={el.func}>
                                    <div className={s.item_icon}>
                                        <img src={el.icon} alt='menu-icon'/>
                                    </div>
                                    <div className={s.item_title}>
                                        {el.title}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}