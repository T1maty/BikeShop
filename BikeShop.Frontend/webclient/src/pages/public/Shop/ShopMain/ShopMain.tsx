import React, {useEffect, useState} from 'react'
import s from './ShopMain.module.scss'
import {useNavigate} from 'react-router-dom'
import {BikeShopPaths} from "../../../../app/routes/paths"
import 'react-image-gallery/styles/css/image-gallery.css'
import useCatalog from "../Catalog/CatalogStore"
import {Workshop} from './Workshop'

import HeaderPhoto1 from '../../../../shared/assets/shop/images/header-photo_01.png'
import HeaderPhoto2 from '../../../../shared/assets/shop/images/header-photo_02.jpg'
import HeaderPhotoWide from '../../../../shared/assets/shop/images/header-photo_wide.jpg'
import WorkshopBanner from '../../../../shared/assets/shop/images/workshop-banner.png'
import WorkshopBannerWithText from '../../../../shared/assets/shop/images/workshop-banner-with-text.png'

import catalogBikes from '../../../../shared/assets/shop/images/catalog-bikes.png'
import catalogProtection from '../../../../shared/assets/shop/images/catalog-protection.png'
import catalogSpares from '../../../../shared/assets/shop/images/catalog-spares.png'
import catalogClothes from '../../../../shared/assets/shop/images/catalog-clothes.png'
import catalogChemistry from '../../../../shared/assets/shop/images/catalog-chemistry.png'
import catalogAccessories from '../../../../shared/assets/shop/images/catalog-accessories.png'
import catalogFood from '../../../../shared/assets/shop/images/catalog-food.png'
import catalogRaznoe from '../../../../shared/assets/shop/images/catalog-raznoe.png'
import catalogSamokat from '../../../../shared/assets/shop/images/catalog-samokat.png'
import {mapURL} from '../../../../shared/config/mapURL'


export const ShopMain = () => {

    const navigate = useNavigate()

    const tags = useCatalog(s => s.tags)
    const getTags = useCatalog(s => s.getTags)
    const setUserCurrentTag = useCatalog(s => s.setUserCurrentTag)
    const setUserCurrentTagsArray = useCatalog(s => s.setUserCurrentTagsArray)

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

    useEffect(() => {
        getTags()
    }, [])

    const openCategoryHandler = (v: number) => {
        setUserCurrentTagsArray([])
        setUserCurrentTag(tags[v])
        navigate(BikeShopPaths.SHOP.CATALOG)
    }

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
                                <a href='#workshop'>Майстерня</a>
                            </div>
                            <div>
                                <a href='#contacts'>Контакти</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.catalog}>
                    <div className={s.container}>
                        <div className={s.catalog_items}>
                            <div className={s.catalog_item4} onClick={() => {
                                openCategoryHandler(1)
                            }}>
                                <img src={catalogSpares} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item5} onClick={() => {
                                openCategoryHandler(2)
                            }}>
                                <img src={catalogProtection} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item1}
                                 onClick={() => {
                                     openCategoryHandler(3)
                                 }}
                            >
                                <img src={catalogBikes} alt="catalog-spares"/>
                            </div>

                            <div className={s.catalog_item6} onClick={() => {
                                openCategoryHandler(3)
                            }}>
                                <img src={catalogClothes} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item2} onClick={() => {
                                openCategoryHandler(4)
                            }}>
                                <img src={catalogSamokat} alt="catalog-spares"/>
                            </div>
                            <div className={s.catalog_item7} onClick={() => {
                                openCategoryHandler(5)
                            }}>
                                <img src={catalogRaznoe} alt="catalog-accessories"/>
                            </div>

                            <div className={s.catalog_item3} onClick={() => {
                                openCategoryHandler(6)
                            }}>
                                <img src={catalogAccessories} alt="catalog-food"/>
                            </div>
                            <div className={s.catalog_item8} onClick={() => {
                                openCategoryHandler(7)
                            }}>
                                <img src={catalogChemistry} alt="catalog-accessories"/>
                            </div>
                            <div className={s.catalog_item9} onClick={() => {
                                openCategoryHandler(8)
                            }}>
                                <img src={catalogFood} alt="catalog-accessories"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.workshop_banner} id={'workshop'}>
                <div className={s.container}>
                    <img src={WorkshopBannerWithText} alt="workshop-banner"/>
                </div>
            </div>

            <Workshop/>

            <div className={s.contacts} id={'contacts'}>
                <div className={s.container}>
                    <div className={s.title}>
                        Контакти
                    </div>
                    <div className={s.info}>
                        <div className={s.info_map}>
                            <iframe
                                src={mapURL}
                                width="700" height="450" loading="lazy"></iframe>
                        </div>
                        <div className={s.info_address}>
                            <div className={s.address_title}>
                                <div>Наш магазин</div>
                                <div>м.Киев, вул.Щербаківського, 59</div>
                            </div>
                            <div className={s.address_time}>
                                <div className={s.time_one}>
                                    <div>Режим работы</div>
                                    <div>ПН-ПТ: 10:00-18:00</div>
                                    <div>СБ-ВС: 10:00-18:00</div>
                                </div>
                                <div className={s.time_two}>
                                    <div>Контактний номер</div>
                                    <div>+38 (093) 211 89 30</div>
                                </div>
                            </div>
                            <div className={s.address_gallery}>

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