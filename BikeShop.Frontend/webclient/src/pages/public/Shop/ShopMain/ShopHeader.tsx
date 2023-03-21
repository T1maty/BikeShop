import React from 'react'
import s from './ShopHeader.module.scss'
import cart from "../../../../shared/assets/shop/icons/cart.png"
import language from "../../../../shared/assets/shop/icons/lang.png"
import {SearchProduct} from './SearchProduct'
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import {LoginBlock} from '../LoginBlock/LoginBlock'

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
                <SearchProduct/>
                {/*<CustomSearchInput placeholder={'Поиск товара'} clearInputValue={() => {}}/>*/}
                <div><img src={language} alt="language-logo"/></div>
                <div><img src={cart} alt="cart-logo"/></div>
                <LoginBlock isAuth={isAuth} userLastName={userLastName} userFirstName={userFirstName}/>
            </div>
        </div>
    );
};