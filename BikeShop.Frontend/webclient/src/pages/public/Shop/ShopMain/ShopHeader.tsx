import React from 'react'
import s from './ShopHeader.module.scss'
import language from "../../../../shared/assets/shop/icons/lang.png"
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import {LoginBlock} from '../LoginBlock/LoginBlock'
import {CustomSearchInput} from "../../../../shared/ui"
import {ShoppingCart} from "../ShoppingCart/ShoppingCart"

interface ShopHeaderProps {
    isAuth: boolean
    userLastName: string
    userFirstName: string
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({isAuth, userLastName, userFirstName}) => {

    const navigate = useNavigate()

    return (
        <div className={s.shop_header}>
            <div className={s.shop_header_left}
                 onClick={() => {navigate(BikeShopPaths.SHOP.HOME)}}
            >
                BikeShop
            </div>

            <div className={s.shop_header_right}>
                <CustomSearchInput placeholder={'Поиск товара'} clearInputValue={() => {}}/>

                <div><img src={language} alt="language-logo"/></div>

                <ShoppingCart/>

                <LoginBlock isAuth={isAuth} userLastName={userLastName} userFirstName={userFirstName}/>
            </div>
        </div>
    )
}