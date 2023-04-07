import React from "react"
import LoaderImage from '../../../shared/assets/shop/icons/isLoadingBikeShop-03.gif'
import s from './ShopLoader.module.scss'

export const ShopLoader = () => {
    return (
        <div className={s.shopLoader}>
            <img src={LoaderImage} alt="loader-image"/>
        </div>
    )
}