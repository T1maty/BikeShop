import React from 'react'
import s from './ShopHeader.module.scss'
import burgerMenu from "../../../../shared/assets/shop/icons/menu.png"
import cart from "../../../../shared/assets/shop/icons/cart.png"
import language from "../../../../shared/assets/shop/icons/lang.png"
import profile from "../../../../shared/assets/shop/icons/profile.png"
import {SearchProduct} from './SearchProduct'

export const ShopHeader = () => {

    return (
        <div className={s.shop_header}>
            <div className={s.shop_header_left}>
                <img src={burgerMenu} alt="burger-menu"/>
            </div>
            <div className={s.shop_header_right}>
                <SearchProduct/>
                <div><img src={cart} alt="cart-logo"/></div>
                <div><img src={language} alt="language-logo"/></div>
                <div><img src={profile} alt="profile-logo"/></div>
            </div>
        </div>
    );
};