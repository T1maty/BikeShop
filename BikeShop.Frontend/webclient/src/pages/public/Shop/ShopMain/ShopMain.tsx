import React, {useEffect, useState} from 'react'
import s from './ShopMain.module.scss'
import {useNavigate} from 'react-router-dom'
import {BikeShopPaths} from "../../../../app/routes/paths"
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import {RegistrationForm} from '../RegistrationForm/RegistrationForm'
import useCatalog from "../Catalog/CatalogStore"
import {Workshop} from './Workshop'

import HeaderPhoto1 from '../../../../shared/assets/shop/images/header-photo_01.png'
import HeaderPhoto2 from '../../../../shared/assets/shop/images/header-photo_02.jpg'
import HeaderPhotoWide from '../../../../shared/assets/shop/images/header-photo_wide.jpg'
import Map from '../../../../shared/assets/shop/images/map-00.png'
import WorkshopBanner from '../../../../shared/assets/shop/images/workshop-banner.png'

import catalogBikes from '../../../../shared/assets/shop/images/catalog-bikes.png'
import catalogProtection from '../../../../shared/assets/shop/images/catalog-protection.png'
import catalogSpares from '../../../../shared/assets/shop/images/catalog-spares.png'
import catalogClothes from '../../../../shared/assets/shop/images/catalog-clothes.png'
import catalogChemistry from '../../../../shared/assets/shop/images/catalog-chemistry.png'
import catalogAccessories from '../../../../shared/assets/shop/images/catalog-accessories.png'
import catalogFood from '../../../../shared/assets/shop/images/catalog-food.png'
import catalogRaznoe from '../../../../shared/assets/shop/images/catalog-raznoe.png'
import catalogSamokat from '../../../../shared/assets/shop/images/catalog-samokat.png'


export const ShopMain = () => {

    const navigate = useNavigate()

    const tags = useCatalog(s => s.tags)
    const getTags = useCatalog(s => s.getTags)
    const setUserCurrentTag = useCatalog(s => s.setUserCurrentTag)

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

    useEffect(() => {
        getTags()
    }, [])

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
                            <div>
                                <a href='#workshop'>Мастерская</a>
                                {/*Мастерская*/}
                            </div>
                            <div>Фотографии</div>
                            <div>Контакты</div>
                        </div>
                    </div>
                </div>

                <div className={s.catalog}>
                    <div className={s.container}>
                        <div className={s.catalog_items}>
                            <div className={s.catalog_item4}>
                                <img src={catalogSpares} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item5}>
                                <img src={catalogProtection} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item1}
                                 onClick={() => {
                                     setUserCurrentTag(tags[1])
                                     navigate(BikeShopPaths.SHOP.CATALOG)}
                                }
                            >
                                <img src={catalogBikes} alt="catalog-spares"/>
                            </div>

                            <div className={s.catalog_item6}>
                                <img src={catalogClothes} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item2}>
                                <img src={catalogSamokat} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item7}>
                                <img src={catalogRaznoe} alt="catalog-accessories"/>
                            </div>

                            <div className={s.catalog_item3}>
                                <img src={catalogAccessories} alt="catalog-food"/>
                            </div>
                            <div className={s.catalog_item8}>
                                <img src={catalogChemistry} alt="catalog-accessories"/>
                            </div>
                            <div className={s.catalog_item9}>
                                <img src={catalogFood} alt="catalog-accessories"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.workshop_banner} id={'workshop'}>
                <div className={s.container}>
                    <img src={WorkshopBanner} alt="workshop-banner"/>
                </div>
            </div>

            <Workshop/>

            <div className={s.contacts}>
                <div className={s.container}>
                    <div className={s.title}>
                        Контакты
                    </div>
                    <div className={s.info}>
                        <div className={s.info_map}>
                            <img src={Map} alt="map"/>
                        </div>
                        <div className={s.info_address}>
                            <div className={s.address_title}>
                                <div>Веломагазин</div>
                                <div>г.Киев, ул.Щербакова, 1</div>
                            </div>
                            <div className={s.address_time}>
                                <div>
                                    <div>Режим работы</div>
                                    <div>ПН-ПТ: 10:00-20:00</div>
                                    <div>СБ-ВС: 10:00-20:00</div>
                                </div>
                                <div>
                                    <div>Контактный номер</div>
                                    <div>+38 (099) 139 23 85</div>
                                </div>
                            </div>
                            <div className={s.address_gallery}>
                                Галерея
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className={s.map}>*/}
            {/*    <img src={Map} alt="map"/>*/}
                {/*<RegistrationForm/>*/}
            {/*</div>*/}

        </div>
    )
}