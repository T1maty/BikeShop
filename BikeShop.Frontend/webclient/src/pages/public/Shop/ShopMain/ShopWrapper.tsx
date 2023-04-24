import React, {useState} from 'react'
import {ReactNode} from 'react'
import s from './ShopWrapper.module.scss'
import {ShopHeader} from "./ShopHeader"
import {ShopFooter} from "./ShopFooter"

type ShopWrapperProps = {
    children: ReactNode
}

export const ShopWrapper: React.FC<ShopWrapperProps> = ({children}) => {

    // const [searchActive, setSearchActive] = useState<boolean>(false)

    return (
        <div className={s.shop_wrapper}>
            <ShopHeader isAuth={true}
                        userLastName={'Петров'}
                        userFirstName={'Василий'}
                        // searchActive={searchActive}
                        // setSearchActive={setSearchActive}
            />

            <div className={s.shop_main}
                 // onClick={() => {setSearchActive(false)}}
            >
                {children}
            </div>

            <ShopFooter/>
        </div>
    )
}