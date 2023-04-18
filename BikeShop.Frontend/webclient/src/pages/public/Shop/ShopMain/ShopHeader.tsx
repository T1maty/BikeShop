import React, {useEffect, useState} from 'react'
import s from './ShopHeader.module.scss'
import language from "../../../../shared/assets/shop/icons/lang.png"
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import {LoginBlock} from '../LoginBlock/LoginBlock'
import {CustomSearchInput} from "../../../../shared/ui"
import {ShoppingCart} from "../ShoppingCart/ShoppingCart"
import ShopLogo from "../../../../shared/assets/shop/icons/ShopLogo.svg"
import CancelIcon from '../../../../shared/assets/shop/icons/cancel-icon-03.svg'
import SearchIcon from '../../../../shared/assets/shop/icons/search.png'
// import BurgerMenuIcon from '../../../../shared/assets/shop/icons/menu-03.svg'
// import BurgerMenuIcon from '../../../../shared/assets/shop/icons/menu.png'
import BurgerMenuIcon from '../../../../shared/assets/workspace/burger-light.svg'
import {BurgerMenu} from "../BurgerMenu/BurgerMenu"
import {useDebounce} from '../../../../shared/hooks/useDebounce'

interface ShopHeaderProps {
    isAuth: boolean
    userLastName: string
    userFirstName: string
    searchActive: any
    setSearchActive: (value: boolean) => void
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({isAuth, userLastName, userFirstName,
                                                          searchActive, setSearchActive}) => {
    const navigate = useNavigate()

    const [menuActive, setMenuActive] = useState<boolean>(false)

    // заготовка для поиска товара
    // const searchProduct = useDebounce<string>(product, 1000)

    // useEffect(() => {
    //     if (product.length > 0) {
    //         findProduct({product})
    //     }
    // }, [searchProduct])

    return (
        <div className={s.shopHeader_wrapper}>
            <div className={s.shopHeader_main}>
                <div className={s.container}>

                    <div className={s.shop_header}>
                        <div className={s.burgerMenu} onClick={() => {setMenuActive(!menuActive)}}>
                            <div className={s.burgerMenu_button}>
                                <img src={menuActive ? CancelIcon : BurgerMenuIcon} alt="burger-menu"/>
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
                            </div>
                            <div className={s.searchIcon} onClick={() => {setSearchActive(!searchActive)}}>
                                <img src={SearchIcon} alt="search-icon"/>
                            </div>

                            <div className={s.language}>
                                <img src={language} alt="language-logo"/>
                            </div>

                            <ShoppingCart/>

                            <LoginBlock isAuth={true}
                                        userLastName={userLastName}
                                        userFirstName={userFirstName}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <BurgerMenu menuActive={menuActive} setMenuActive={setMenuActive}/>

            {
                searchActive &&
                <div className={s.searchInputBox}>
                    <input type='text' placeholder={'Поиск товара...'} autoFocus/>
                </div>
            }
        </div>
    )
}