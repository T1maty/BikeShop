import React from 'react'
import s from './ShopHeader.module.scss'
import cart from "../../../../shared/assets/shop/icons/cart.png"
import language from "../../../../shared/assets/shop/icons/lang.png"
import profile from "../../../../shared/assets/shop/icons/profile.png"
import {SearchProduct} from './SearchProduct'
import {BikeShopPaths} from '../../../../app/routes/paths';
import {useNavigate} from 'react-router-dom';
import {ProfileAvatar} from '../Profile/ProfileAvatar';

export const ShopHeader = () => {

    const navigate = useNavigate()

    // тестовые данные
    const isAuth = false
    const userLastName = 'Петров'
    const userFirstName = 'Василий'

    return (
        <div className={s.shop_header}>
            <div className={s.shop_header_left}>
                BikeShop
            </div>
            <div className={s.shop_header_right}>
                <SearchProduct/>
                <div><img src={language} alt="language-logo"/></div>
                <div><img src={cart} alt="cart-logo"/></div>
                {
                    isAuth ?
                        <div className={s.right_userInfo}>
                            <ProfileAvatar lastName={userLastName} firstName={userFirstName}/>
                            <div>{userLastName} {''} {userFirstName}</div>
                        </div>
                        :
                        <div className={s.right_loginBlock}>
                            <div className={s.loginBlock_profileIcon}>
                                <img src={profile} alt="profile-logo"/>
                            </div>
                            <div className={s.loginBlock_enter}
                                 onClick={() => {navigate(BikeShopPaths.WORKSPACE.LOGIN)}}
                            >
                                Вход
                            </div>
                            <div className={s.loginBlock_registration}
                                 onClick={() => {navigate(BikeShopPaths.WORKSPACE.REGISTRATION)}}
                            >
                                Регистрация
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};