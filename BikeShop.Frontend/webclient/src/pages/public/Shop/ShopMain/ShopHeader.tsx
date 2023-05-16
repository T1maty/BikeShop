import React, {ChangeEvent, useEffect, useState} from 'react'
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
import {Product, User} from '../../../../entities'
import useCatalog from "../Catalog/CatalogStore"
import {useSnackbar} from "notistack"
// import SearchMagnifyIcon from '../../../../shared/assets/workspace/magnifying-glass-black.svg'
import SearchMagnifyIcon from '../../../../shared/assets/shop/icons/search.png'

interface ShopHeaderProps {
    isAuth: boolean
    user: User | undefined
    searchMobileActive: boolean
    setSearchMobileActive: (value: boolean) => void
    searchProductValue: string
    setSearchProductValue: (value: string) => void
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({
                                                          isAuth, user,
                                                          searchMobileActive, setSearchMobileActive,
                                                          searchProductValue, setSearchProductValue,
                                                      }) => {

    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const errorStatus = useCatalog(s => s.errorStatus)
    const searchProductsResult = useCatalog(s => s.searchProductsResult)
    const getSearchProducts = useCatalog(s => s.getSearchProducts)

    const [burgerMenuActive, setBurgerMenuActive] = useState<boolean>(false)
    // const [searchMobileActive, setSearchMobileActive] = useState<boolean>(false)
    // const [searchProductValue, setSearchProductValue] = useState<string>('')

    const searchProductDebounce = useDebounce<string>(searchProductValue, 1000)

    const chooseSearchProductHandler = (pr: Product) => {
        navigate(`/shop/catalog/${pr.id}`)
        setSearchProductValue('')
    }

    const goToShopHandler = () => {
        if (user !== undefined && user.shopId > 0) {
            navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)
        } else {
            navigate(BikeShopPaths.SHOP.HOME)
        }
    }

    useEffect(() => {
        if (searchProductValue.length > 0) {
            getSearchProducts(searchProductValue)
        }
    }, [searchProductDebounce])

    useEffect(() => {
        if (errorStatus === 'success') {
            enqueueSnackbar('Операция выполнена', {variant: 'success', autoHideDuration: 3000})
        }
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    return (
        <>
            <header className={s.shopHeader_wrapper}>
                <div className={s.shopHeader_main}>

                    <div className={s.container}>

                        <div className={s.shop_header}>
                            <div className={s.burgerMenu}
                                 onClick={() => {
                                     setBurgerMenuActive(!burgerMenuActive)
                                 }}
                            >
                                <div className={s.burgerMenu_button}>
                                    <img src={burgerMenuActive ? CancelIcon : BurgerMenuIcon} alt="burger-menu"/>
                                </div>
                            </div>

                            <div className={s.shop_header_left}>
                                {
                                    user !== undefined && user.shopId > 0 ?
                                    <div className={s.logo_image} onClick={goToShopHandler}>
                                        <img src={ShopLogo} alt="shop-logo"/>
                                    </div> : ''
                                }
                                <div className={s.logo_name} onClick={() => {navigate(BikeShopPaths.SHOP.HOME)}}>
                                    BikeLove
                                </div>
                            </div>

                            <div className={s.shop_header_right}>
                                <div className={s.searchField}>
                                    <CustomSearchInput placeholder={'Поиск товара...'}
                                                       value={searchProductValue}
                                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                           setSearchProductValue(e.currentTarget.value)
                                                       }}
                                                       clearInputValue={() => {
                                                           setSearchProductValue('')
                                                       }}
                                    />

                                    <div
                                        className={searchProductValue.length > 0 ? s.searchInputBox_active : s.searchInputBox}>
                                        {
                                            searchProductsResult.length === 0
                                                ? <div style={{textAlign: 'center'}}>Поиск...</div> :
                                                searchProductsResult.map((pr: Product) => {
                                                    return (
                                                        <div className={s.searchInputBox_item} key={pr.id}
                                                             onClick={() => {
                                                                 chooseSearchProductHandler(pr)
                                                             }}
                                                        >
                                                            {pr.name}
                                                        </div>
                                                    )
                                                })
                                        }
                                    </div>
                                </div>
                                <div className={s.search_mobile}
                                     onClick={() => {
                                         setSearchMobileActive(!searchMobileActive)
                                     }}
                                >
                                    <img src={SearchMagnifyIcon} alt='magnify-icon'/>
                                </div>

                                <div className={s.language}>
                                    <img src={language} alt="language-logo"/>
                                </div>

                                <ShoppingCart/>

                                <LoginBlock isAuth={isAuth} user={user}/>
                            </div>
                        </div>

                    </div>

                    {
                        searchMobileActive &&
                        <div className={s.input_mobile}>
                            <input placeholder={'Поиск товара...'}
                                   value={searchProductValue}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                       setSearchProductValue(e.currentTarget.value)
                                   }}
                            />
                        </div>
                    }

                    <div
                        className={searchProductValue.length > 0 ? s.searchInputBox_mobile_active : s.searchInputBox_mobile}>
                        {
                            searchProductsResult.length === 0
                                ? <div style={{textAlign: 'center'}}>Поиск...</div> :
                                searchProductsResult.map((pr: Product) => {
                                    return (
                                        <div className={s.searchInputBox_item} key={pr.id}
                                             onClick={() => {
                                                 chooseSearchProductHandler(pr)
                                             }}
                                        >
                                            {pr.name}
                                        </div>
                                    )
                                })
                        }
                    </div>

                </div>
                <BurgerMenu menuActive={burgerMenuActive} setMenuActive={setBurgerMenuActive}/>
            </header>
        </>
    )
}