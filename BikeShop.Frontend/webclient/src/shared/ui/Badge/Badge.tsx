import React, {FC, ReactElement} from 'react'
import cls from './Badge.module.scss'

type BadgeType = {
    children: ReactElement
    badgeContent: number
}

export const Badge: FC<BadgeType> = ({children,badgeContent}) => {
    return (
        <span className={cls.wrapper}>
            {children}
            <span className={cls.badge}>{badgeContent}</span>
        </span>
    )
}
