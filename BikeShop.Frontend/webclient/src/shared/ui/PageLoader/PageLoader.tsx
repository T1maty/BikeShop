import React, {type FC} from 'react'
import cls from './PageLoader.module.scss'
import {Loader, VariantLoadingType} from 'shared/ui/Loader/Loader'

interface PageLoaderProps {
    className?: string
    variant?: VariantLoadingType
}

export const PageLoader: FC<PageLoaderProps> = ({className = '', variant}) => {

    return (
        <div className={`${cls.PageLoader} ${className}`}>
            <Loader variant={variant}/>
        </div>
    )
}
