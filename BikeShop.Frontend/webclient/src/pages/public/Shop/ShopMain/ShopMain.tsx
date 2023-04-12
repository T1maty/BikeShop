import React, {useState} from 'react'
import s from './ShopMain.module.scss'

import HeaderPhoto from '../../../../shared/assets/shop/images/header_photo.png'
import HeaderPhoto2 from '../../../../shared/assets/shop/images/shop-MainPagePhoto.jpg'
import SocialLogo from '../../../../shared/assets/shop/icons/logo_instagram.png'
import Map from '../../../../shared/assets/shop/images/map-01.png'
import BurgerMenu from '../../../../shared/assets/shop/icons/menu.png'
import Position from '../../../../shared/assets/shop/icons/position.png'
import ShopLogo from '../../../../shared/assets/shop/icons/ShopLogo.svg'
import SearchIcon from '../../../../shared/assets/shop/icons/search.png'
import Cart from '../../../../shared/assets/shop/icons/cart.png'
import Language from '../../../../shared/assets/shop/icons/lang.png'
import Profile from '../../../../shared/assets/shop/icons/profile.png'

import catalogBikes from '../../../../shared/assets/shop/images/catalog-bikes.png'
import catalogProtection from '../../../../shared/assets/shop/images/catalog-protection.png'
import catalogSpares from '../../../../shared/assets/shop/images/catalog-spares.png'
import testImage1 from '../../../../shared/assets/shop/images/testImage-square.png'
import testImage2 from '../../../../shared/assets/shop/images/testImage-squareBig.png'
import testImage3 from '../../../../shared/assets/shop/images/testImage-rectangle.png'
import catalogClothes from '../../../../shared/assets/shop/images/catalog-clothes.png'
import catalogChemistry from '../../../../shared/assets/shop/images/catalog-chemistry.png'
import catalogAccessories from '../../../../shared/assets/shop/images/catalog-accessories.png'
import catalogFood from '../../../../shared/assets/shop/images/catalog-food.png'

import {useNavigate} from 'react-router-dom'
import {BikeShopPaths} from "../../../../app/routes/paths"
import {ShopFooter} from "./ShopFooter"
import {CustomSearchInput} from 'shared/ui'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import {LoginBlock} from '../LoginBlock/LoginBlock'
import {RegistrationForm} from '../RegistrationForm/RegistrationForm'
import {ShoppingCart} from '../ShoppingCart/ShoppingCart';

export const ShopMain = () => {

    const navigate = useNavigate()
    const [search, setSearch] = useState<boolean>(false)

    const [sliderImages, setSliderImages] = useState([
        {
            original: HeaderPhoto,
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

    const catalogGridClassName = `${s.catalog_items} ${s.catalog_items_extra}`

    return (
        <div className={s.shop_wrapper}>
            <div className={s.header}>
                <div className={s.header_slider}>
                    <img src={HeaderPhoto} alt="header-photo"/>
                </div>
                {/*<div className={s.header_slider}>*/}
                {/*    <ImageGallery items={sliderImages}*/}
                {/*                  showPlayButton={false}*/}
                {/*                  showFullscreenButton={false}*/}
                {/*                  showThumbnails={false}*/}
                {/*                  autoPlay={true}*/}
                {/*                  slideDuration={3000}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className={s.header_icons}>
                    <div className={s.header_icons_left}
                         onClick={() => {
                             navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)
                         }}
                    >
                        <img src={ShopLogo} alt="shop-logo"/>
                    </div>
                    <div className={s.header_icons_right}>
                        {
                            search ? <CustomSearchInput placeholder={'Поиск товара'}
                                                        color={'black'}
                                                        clearInputValue={() => {
                                                        }}/>
                                : ''
                        }
                        <div onClick={() => {
                            setSearch(!search)
                        }}>
                            <img src={SearchIcon} alt="search-logo"/>
                        </div>
                        <div>
                            <img src={Language} alt="language-logo"/>
                        </div>
                        <ShoppingCart/>
                        <LoginBlock isAuth={isAuth}
                                    userLastName={userLastName}
                                    userFirstName={userFirstName}
                        />
                    </div>
                </div>
            </div>

            <div className={s.content}>
                <div className={s.menu}>
                    <div className={s.container}>
                        <div className={s.menu_items}>
                            <div onClick={() => {
                                navigate(BikeShopPaths.SHOP.CATALOG)
                            }}>
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
                            {/*<div className={s.catalog_item}>*/}
                            {/*    <img src={testImage1} alt="catalog-spares"/>*/}
                            {/*</div>*/}
                            {/*<div className={s.catalog_item}>*/}
                            {/*    <img src={testImage1} alt="catalog-spares"/>*/}
                            {/*</div>*/}
                            {/*<div className={s.catalog_item}>*/}
                            {/*    <img src={testImage1} alt="catalog-spares"/>*/}
                            {/*</div>*/}
                            <div className={s.catalog_item}>
                                <img src={testImage1} alt="catalog-spares"/>
                            </div>
                            <div className={`${s.catalog_items} ${s.catalog_items_big}`}>
                                <img src={testImage2} alt="catalog-spares"/>
                            </div>
                            <div className={`${s.catalog_items} ${s.catalog_items_long1}`}>
                                <img src={testImage3} alt="catalog-accessories"/>
                            </div>
                            <div className={`${s.catalog_items} ${s.catalog_items_long2}`}>
                                <img src={testImage3} alt="catalog-food"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.map}>
                <img src={Map} alt="map"/>
                <RegistrationForm/>
            </div>

            <ShopFooter/>
        </div>
    )
}