import React from "react"
import {Loader, VariantLoadingType} from "../Loader/Loader"
import s from './LoaderScreen.module.scss'

interface LoaderScreenProps {
    variant: VariantLoadingType
}

export const LoaderScreen: React.FC<LoaderScreenProps> = ({variant}) => {
    return (
        <div className={s.loaderScreenBox}>
            <div className={s.loader}>
                <Loader variant={variant}/>
            </div>
        </div>
    )
}