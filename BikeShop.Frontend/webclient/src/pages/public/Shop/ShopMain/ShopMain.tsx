import React, {useState} from 'react'
import s from './ShopMain.module.scss'

import HeaderPhoto1 from '../../../../shared/assets/shop/images/header-photo_01.png'
import HeaderPhoto2 from '../../../../shared/assets/shop/images/header-photo_02.jpg'
import HeaderPhotoWide from '../../../../shared/assets/shop/images/header-photo_wide.jpg'
import SocialLogo from '../../../../shared/assets/shop/icons/logo_instagram.png'
import Map from '../../../../shared/assets/shop/images/map-01.png'
import BurgerMenu from '../../../../shared/assets/shop/icons/menu.png'
import Position from '../../../../shared/assets/shop/icons/position.png'
import ShopLogo from '../../../../shared/assets/shop/icons/ShopLogo.svg'
import SearchIcon from '../../../../shared/assets/shop/icons/search.png'
import Cart from '../../../../shared/assets/shop/icons/cart.png'
import Language from '../../../../shared/assets/shop/icons/lang.png'
import Profile from '../../../../shared/assets/shop/icons/profile.png'

import testImage1 from '../../../../shared/assets/shop/images/testImage-rectangle-21.jpg'
import testImage2 from '../../../../shared/assets/shop/images/testImage-rectangle-22.jpg'
import testImage3 from '../../../../shared/assets/shop/images/testImage-rectangle-23.jpg'

import testImage4 from '../../../../shared/assets/shop/images/testImage-square-24.jpg'
import testImage5 from '../../../../shared/assets/shop/images/testImage-square-25.jpg'
import testImage6 from '../../../../shared/assets/shop/images/testImage-square-26.jpg'
import testImage7 from '../../../../shared/assets/shop/images/testImage-square-27.jpg'
import testImage8 from '../../../../shared/assets/shop/images/testImage-square-28.jpg'
import testImage9 from '../../../../shared/assets/shop/images/testImage-square-29.jpg'

// import catalogBikes from '../../../../shared/assets/shop/images/catalog-bikes.png'
// import catalogProtection from '../../../../shared/assets/shop/images/catalog-protection.png'
// import catalogSpares from '../../../../shared/assets/shop/images/catalog-spares.png'
// import catalogClothes from '../../../../shared/assets/shop/images/catalog-clothes.png'
// import catalogChemistry from '../../../../shared/assets/shop/images/catalog-chemistry.png'
// import catalogAccessories from '../../../../shared/assets/shop/images/catalog-accessories.png'
// import catalogFood from '../../../../shared/assets/shop/images/catalog-food.png'

import {useNavigate} from 'react-router-dom'
import {BikeShopPaths} from "../../../../app/routes/paths"
import {ShopFooter} from "./ShopFooter"
import {CustomSearchInput} from 'shared/ui'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import {LoginBlock} from '../LoginBlock/LoginBlock'
import {RegistrationForm} from '../RegistrationForm/RegistrationForm'
import {ShoppingCart} from '../ShoppingCart/ShoppingCart'
import {ShopHeader} from "./ShopHeader"

export const ShopMain = () => {

    const navigate = useNavigate()
    const [search, setSearch] = useState<boolean>(false)

    const [sliderImages, setSliderImages] = useState([
        {
            original: HeaderPhoto1,
            thumbnail: '',
        },
        {
            original: HeaderPhoto2,
            thumbnail: '',
        },
    ])

    // тестовые данные
    const isAuth = false
    const userLastName = 'Петров'
    const userFirstName = 'Василий'

    // вариант совмещения двух и более классов в одном
    // const catalogGridClassName = `${s.catalog_items} ${s.catalog_items_extra}`

    return (
        // <>
        <div className={s.shop_wrapper}>
            {/*<div className={s.header}>*/}
            {/*    <div className={s.header_slider}>*/}
            {/*        <img src={HeaderPhotoWide} alt="header-photo"/>*/}
            {/*    </div>*/}
            {/*    /!*<div className={s.header_slider}>*!/*/}
            {/*    /!*    <ImageGallery items={sliderImages}*!/*/}
            {/*    /!*                  showPlayButton={false}*!/*/}
            {/*    /!*                  showFullscreenButton={false}*!/*/}
            {/*    /!*                  showThumbnails={false}*!/*/}
            {/*    /!*                  autoPlay={true}*!/*/}
            {/*    /!*                  slideDuration={3000}*!/*/}
            {/*    /!*    />*!/*/}
            {/*    /!*</div>*!/*/}

            {/*    <div className={s.header_icons}>*/}
            {/*        <div className={s.header_icons_left}*/}
            {/*             onClick={() => {navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)}}*/}
            {/*        >*/}
            {/*            <img src={ShopLogo} alt="shop-logo"/>*/}
            {/*        </div>*/}
            {/*        <div className={s.header_icons_right}>*/}
            {/*            {*/}
            {/*                search ? <CustomSearchInput placeholder={'Поиск товара'}*/}
            {/*                                            color={'black'}*/}
            {/*                                            clearInputValue={() => {}}*/}
            {/*                        />*/}
            {/*                    : ''*/}
            {/*            }*/}
            {/*            <div onClick={() => {setSearch(!search)}}>*/}
            {/*                <img src={SearchIcon} alt="search-logo"/>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <img src={Language} alt="language-logo"/>*/}
            {/*            </div>*/}
            {/*            <ShoppingCart/>*/}
            {/*            <LoginBlock isAuth={isAuth}*/}
            {/*                        userLastName={userLastName}*/}
            {/*                        userFirstName={userFirstName}*/}
            {/*            />*/}
            {/*        </div>*/}

            {/*        /!*<div className={s.burgerMenu}>*!/*/}
            {/*        /!*    <div>*!/*/}
            {/*        /!*        <img src={BurgerMenu} alt="burger-menu"/>*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        /!*</div>*!/*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<ShopHeader isAuth={isAuth} userLastName={userLastName} userFirstName={userFirstName}/>*/}

            <div className={s.header_slider}>
                <img src={HeaderPhotoWide} alt="header-photo"/>
            </div>

            <div className={s.content}>
                <div className={s.menu}>
                    <div className={s.container}>
                        <div className={s.menu_items}>
                            <div onClick={() => {navigate(BikeShopPaths.SHOP.CATALOG)}}>
                                Каталог
                            </div>
                            <div>Мастерская</div>
                            <div>Фотографии</div>
                            <div>Контакты</div>
                        </div>
                    </div>
                </div>

                <div className={s.catalog}>
                    <div className={s.container}>
                        <div className={s.catalog_items}>
                            <div className={s.catalog_item4}>
                                <img src={testImage4} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item5}>
                                <img src={testImage5} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item1}>
                                <img src={testImage1} alt="catalog-spares"/>
                            </div>

                            <div className={s.catalog_item6}>
                                <img src={testImage6} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item2}>
                                <img src={testImage2} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item7}>
                                <img src={testImage7} alt="catalog-accessories"/>
                            </div>

                            <div className={s.catalog_item3}>
                                <img src={testImage3} alt="catalog-food"/>
                            </div>
                            <div className={s.catalog_item8}>
                                <img src={testImage8} alt="catalog-accessories"/>
                            </div>
                            <div className={s.catalog_item9}>
                                <img src={testImage9} alt="catalog-accessories"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.map}>
                <img src={Map} alt="map"/>
                <RegistrationForm/>
            </div>

            {/*<ShopFooter/>*/}
        </div>
        // </>
    )
}