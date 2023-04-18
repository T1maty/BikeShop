import React from 'react'
import {ReactNode} from 'react'
import s from './ShopWrapper.module.scss'
import {ShopHeader} from "./ShopHeader"
import {ShopFooter} from "./ShopFooter"

type ShopWrapperProps = {
    children: ReactNode
}

export const ShopWrapper: React.FC<ShopWrapperProps> = ({children}) => {

    return (
        <div className={s.shop_wrapper}>
            <ShopHeader isAuth={false} userLastName={'Петров'} userFirstName={'Василий'}/>
            <div className={s.shop_main}>
                {children}
            </div>
            <ShopFooter/>
        </div>
    );
};