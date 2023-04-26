import React, {useEffect, useState} from 'react'
import s from './ShopHeader.module.scss'
import language from '../../../../shared/assets/shop/icons/lang.png'
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import {LoginBlock} from '../LoginBlock/LoginBlock'
import {CustomSearchInput} from '../../../../shared/ui'
import {ShoppingCart} from '../ShoppingCart/ShoppingCart'
import ShopLogo from '../../../../shared/assets/shop/icons/ShopLogo.svg'
import CancelIcon from '../../../../shared/assets/shop/icons/cancel-icon-03.svg'
import BurgerMenuIcon from '../../../../shared/assets/workspace/burger-light.svg'
import {BurgerMenu} from '../BurgerMenu/BurgerMenu'
import {useDebounce} from '../../../../shared/hooks/useDebounce'
import {User} from '../../../../entities'

interface ShopHeaderProps {
    isAuth: boolean
    user: User
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({isAuth, user}) => {

    const navigate = useNavigate()

    const [burgerMenuActive, setBurgerMenuActive] = useState<boolean>(false)

    // заготовка для поиска товара
    // const searchProduct = useDebounce<string>(productForSearch, 1000)

    // useEffect(() => {
    //     if (productForSearch.length > 0) {
    //         findProduct({productForSearch})
    //     }
    // }, [searchProduct])

    return (
        <>
            <div className={s.shopHeader_wrapper}>
                <div className={s.shopHeader_main}>
                    <div className={s.container}>

                        <div className={s.shop_header}>
                            <div className={s.burgerMenu}
                                 onClick={() => {setBurgerMenuActive(!burgerMenuActive)}}
                            >
                                <div className={s.burgerMenu_button}>
                                    <img src={burgerMenuActive ? CancelIcon : BurgerMenuIcon} alt="burger-menu"/>
                                </div>
                            </div>

                            <div className={s.shop_header_left}
                                 onClick={() => {navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)}}
                            >
                                <img src={ShopLogo} alt="shop-logo"/>
                            </div>

                            <div className={s.shop_header_right}>
                                <div className={s.searchField}>
                                    <CustomSearchInput placeholder={'Поиск товара...'} clearInputValue={() => {}}/>

                                    {/*<div className={s.searchInputBox}>*/}
                                    {/*    Результат поиска*/}
                                    {/*</div>*/}
                                </div>

                                <div className={s.language}>
                                    <img src={language} alt="language-logo"/>
                                </div>

                                <ShoppingCart/>

                                <LoginBlock isAuth={true}
                                            user={user}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <BurgerMenu menuActive={burgerMenuActive} setMenuActive={setBurgerMenuActive}/>
            </div>
        </>
    )
}