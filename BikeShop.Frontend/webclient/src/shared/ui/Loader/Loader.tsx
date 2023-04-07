import React, {type FC} from 'react'
import cls from './Loader.module.scss'

interface LoaderProps {
    className?: string,
    variant?: VariantLoadingType
}

const VariantLoading = {
    'spinner': {
        name: cls.ldsSpinner,
        value: 12
    },
    'loader': {
        name: cls.loader,
        value: 0
    },
    'circle': {
        name: cls.circle,
        value: 0
    },
    'ellipsis': {
        name: cls.ldsEllipsis,
        value: 4
    }
} as const

export type VariantLoadingType = keyof typeof VariantLoading

export const Loader: FC<LoaderProps> = ({className = '', variant = 'loader'}) => {

    const loading = VariantLoading[variant]

    return (
        <div className={`${loading.name} ${className}`}>
            {[...Array(loading.value)].map((_, index) => {
                return <div key={index}></div>
            })}
        </div>
    )
}