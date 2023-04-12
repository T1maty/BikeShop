import React, {useState} from 'react'
import s from './ShopMain.module.scss'

import headerPhoto from '../../../../shared/assets/shop/images/header_photo.png'
import socialLogo from '../../../../shared/assets/shop/icons/logo_instagram.png'
import catalogBikes from '../../../../shared/assets/shop/images/catalog-bikes.png'
import catalogProtection from '../../../../shared/assets/shop/images/catalog-protection.png'
import catalogSpares from '../../../../shared/assets/shop/images/catalog-spares.png'
import catalogClothes from '../../../../shared/assets/shop/images/catalog-clothes.png'
import catalogChemistry from '../../../../shared/assets/shop/images/catalog-chemistry.png'
import catalogAccessories from '../../../../shared/assets/shop/images/catalog-accessories.png'
import catalogFood from '../../../../shared/assets/shop/images/catalog-food.png'
import map from '../../../../shared/assets/shop/images/map-01.png'
import burgerMenu from '../../../../shared/assets/shop/icons/menu.png'
import position from '../../../../shared/assets/shop/icons/position.png'
import searchIcon from '../../../../shared/assets/shop/icons/search.png'
import cart from '../../../../shared/assets/shop/icons/cart.png'
import language from '../../../../shared/assets/shop/icons/lang.png'
import profile from '../../../../shared/assets/shop/icons/profile.png'

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
            original: headerPhoto,
            thumbnail: '',
        },
        {
            original: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2018/10/red-bull-rampage-rugged-terrain.jpg',
            thumbnail: '',
        },
    ])

    // тестовые данные
    const isAuth = false
    const userLastName = 'Петров'
    const userFirstName = 'Василий'

    return (
        <div className={s.shop_wrapper}>
            {/*<div className={s.shop_mainBox}>*/}
            <div className={s.header}>
                {/*<div className={s.header_slider}>*/}
                {/*    <img src={headerPhoto} alt="header-photo"/>*/}
                {/*</div>*/}
                <div className={s.header_slider}>
                    <ImageGallery items={sliderImages}
                                  showPlayButton={false}
                                  showFullscreenButton={false}
                                  showThumbnails={false}
                                  autoPlay={true}
                                  slideDuration={3000}
                    />
                </div>
                <div className={s.header_icons}>
                    <div className={s.header_icons_left}>
                        <div><img src={burgerMenu} alt="burger-menu"/></div>
                        <div onClick={() => {
                            navigate(BikeShopPaths.WORKSPACE.MAIN_PAGE)
                        }}>
                            <img src={position} alt="position-logo"/>
                        </div>
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
                            <img src={searchIcon} alt="search-logo"/>
                        </div>

                        <div><img src={language} alt="language-logo"/></div>
                        {/*<div><img src={cart} alt="cart-logo"/></div>*/}
                        <ShoppingCart/>

                        <LoginBlock isAuth={isAuth} userLastName={userLastName} userFirstName={userFirstName}/>
                    </div>
                </div>
            </div>

            <div className={s.content}>
                <div className={s.menu}>
                    <div className={s.container}>
                        <div className={s.menu_items}>
                            <div onClick={() => {navigate(BikeShopPaths.SHOP.CATALOG)}}>
                                Каталог
                            </div>
                            <div>Мастерская</div>
                            <div>Фото</div>
                            <div>Контакты</div>
                        </div>
                    </div>
                </div>

                <div className={s.catalog}>
                    <div className={s.catalog_group1}>
                        <div className={s.catalog_item1}>
                            <img src={catalogBikes} alt="catalog-bikes"/>
                        </div>
                        <div className={s.catalog_item2}>
                            <img src={catalogProtection} alt="catalog-protection"/>
                        </div>
                        <div className={s.catalog_item3}>
                            <img src={catalogSpares} alt="catalog-spares"/>
                        </div>
                        <div className={s.catalog_item4}>
                            <img src={catalogClothes} alt="catalog-clothes"/>
                        </div>
                        <div className={s.catalog_item5}>
                            <img src={catalogChemistry} alt="catalog-chemistry"/>
                        </div>
                    </div>
                    <div className={s.catalog_group2}>
                        <div className={s.catalog_item}>
                            <img src={catalogAccessories} alt="catalog-accessories"/>
                        </div>
                        <div className={s.catalog_item}>
                            <img src={catalogFood} alt="catalog-food"/>
                        </div>
                    </div>

                </div>
            </div>

            <div className={s.map}>
                <img src={map} alt="map"/>
                <RegistrationForm/>
            </div>

            <ShopFooter/>
            {/*</div>*/}
        </div>
    )
}