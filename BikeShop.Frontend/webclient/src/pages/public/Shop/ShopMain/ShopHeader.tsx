import React, {useState} from 'react'
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

interface ShopHeaderProps {
    isAuth: boolean
    userLastName: string
    userFirstName: string
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({isAuth, userLastName, userFirstName}) => {

    const navigate = useNavigate()

    const [menuActive, setMenuActive] = useState<boolean>(false)
    const [searchActive, setSearchActive] = useState<boolean>(false)

    return (
        <div className={s.shop_wrapper}>
            <div className={s.shop_headerMain}>
                <div className={s.container}>

                    <div className={s.shop_header}>
                        <div className={s.shop_header_left}
                             onClick={() => {navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)}}
                        >
                            <img src={ShopLogo} alt="shop-logo"/>
                        </div>

                        <div className={s.shop_header_right}>
                            <div className={s.searchField}>
                                <CustomSearchInput placeholder={'Поиск товара'} clearInputValue={() => {}}/>
                            </div>
                            <div className={s.searchIcon} onClick={() => {setSearchActive(!searchActive)}}>
                                <img src={SearchIcon} alt="search-icon"/>
                            </div>

                            <div>
                                <img src={language} alt="language-logo"/>
                            </div>

                            <ShoppingCart/>

                            <LoginBlock isAuth={isAuth} userLastName={userLastName} userFirstName={userFirstName}/>
                        </div>
                    </div>

                    <div className={s.burgerMenu} onClick={() => {setMenuActive(!menuActive)}}>
                        <div className={s.burgerMenu_button}>
                            <img src={menuActive ? CancelIcon : BurgerMenuIcon} alt="burger-menu"/>
                        </div>
                    </div>
                </div>
            </div>

            <BurgerMenu menuActive={menuActive} setMenuActive={setMenuActive}/>
        </div>
    )
}