import React from 'react'
import s from './ShopHeader.module.scss'
import language from "../../../../shared/assets/shop/icons/lang.png"
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import {LoginBlock} from '../LoginBlock/LoginBlock'
import {CustomSearchInput} from "../../../../shared/ui"
import {ShoppingCart} from "../ShoppingCart/ShoppingCart"
import ShopLogo from "../../../../shared/assets/shop/icons/ShopLogo.svg"
import BurgerMenu from '../../../../shared/assets/workspace/burger-light.svg'
// import BurgerMenu from '../../../../shared/assets/shop/icons/menu.png'

interface ShopHeaderProps {
    isAuth: boolean
    userLastName: string
    userFirstName: string
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({isAuth, userLastName, userFirstName}) => {

    const navigate = useNavigate()

    return (
        <div className={s.shop_headerMain}>
            <div className={s.container}>

                <div className={s.shop_header}>
                    <div className={s.shop_header_left}
                         onClick={() => {navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)}}
                    >
                        <img src={ShopLogo} alt="shop-logo"/>
                    </div>

                    <div className={s.shop_header_right}>
                        <CustomSearchInput placeholder={'Поиск товара'} clearInputValue={() => {}}/>

                        <div>
                            <img src={language} alt="language-logo"/>
                        </div>

                        <ShoppingCart/>

                        <LoginBlock isAuth={isAuth} userLastName={userLastName} userFirstName={userFirstName}/>
                    </div>
                </div>

                <div className={s.burgerMenu}>
                    <div className={s.burgerMenu_button}>
                        <img src={BurgerMenu} alt="burger-menu"/>
                    </div>
                </div>

            </div>
        </div>
    )
}