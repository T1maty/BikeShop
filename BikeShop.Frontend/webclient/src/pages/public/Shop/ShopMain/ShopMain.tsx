import React, {useState} from 'react'
import s from './ShopMain.module.scss'
import {useNavigate} from 'react-router-dom'
import {BikeShopPaths} from "../../../../app/routes/paths"
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import {RegistrationForm} from '../RegistrationForm/RegistrationForm'

import HeaderPhoto1 from '../../../../shared/assets/shop/images/header-photo_01.png'
import HeaderPhoto2 from '../../../../shared/assets/shop/images/header-photo_02.jpg'
import HeaderPhotoWide from '../../../../shared/assets/shop/images/header-photo_wide.jpg'
import Map from '../../../../shared/assets/shop/images/map-01.png'

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

export const ShopMain = () => {

    const navigate = useNavigate()

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

    // вариант совмещения двух и более классов в одном
    // const catalogGridClassName = `${s.catalog_items} ${s.catalog_items_extra}`

    return (
        <div className={s.shop_wrapper}>

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

        </div>
    )
}