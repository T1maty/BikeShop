import React, {useEffect, useState} from 'react'
import {ReactNode} from 'react'
import s from './ShopWrapper.module.scss'
import {ShopHeader} from "./ShopHeader"
import {ShopFooter} from "./ShopFooter"
import {useAuth} from '../../../../entities'

type ShopWrapperProps = {
    children: ReactNode
}

export const ShopWrapper: React.FC<ShopWrapperProps> = ({children}) => {

    const isAuth = useAuth(s => s.isAuth)
    const setIsAuth = useAuth(s => s.setIsAuth)
    const user = useAuth(s => s.user)

    useEffect(() => {
        if (user !== undefined) {
            setIsAuth(true)
        }
    }, [isAuth])

    return (
        <div className={s.shop_wrapper}>
            <ShopHeader isAuth={isAuth} user={user!}/>

            <div className={s.shop_main}>
                {children}
            </div>

            <ShopFooter/>
        </div>
    )
}