import React from "react"
import s from './LoaderScreenForShop.module.scss'

interface LoaderScreenShopProps {
    image: string
}

export const LoaderScreenForShop: React.FC<LoaderScreenShopProps> = ({image}) => {
    return (
        <div className={s.loaderScreenBox}>
            <div className={s.loader}>
                <img src={image} alt="shop-loader"/>
            </div>
        </div>
    )
}