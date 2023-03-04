import React from 'react'
import {ShopHeader} from "./ShopHeader"
import {ShopFooter} from "./ShopFooter"

interface props {
    children: any
}

export const ShopWrapper = (props: props) => {
    return (
        <>
            <ShopHeader/>
            {props.children}
            <ShopFooter/>
        </>
    );
};