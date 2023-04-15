import React from 'react'
import s from './BurgerMenu.module.scss'
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'

interface BurgerMenuProps {
    menuActive: any
    setMenuActive: (value: boolean) => void
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({menuActive, setMenuActive}) => {

    const navigate = useNavigate()

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
                    <div onClick={() => {navigate(BikeShopPaths.SHOP.HOME); setMenuActive(false)}}>Главная</div>
                    <div onClick={() => {navigate(BikeShopPaths.SHOP.CATALOG); setMenuActive(false)}}>
                        Каталог
                    </div>
                    <div>Контакты</div>
                </div>
            </div>
        </div>
    )
}