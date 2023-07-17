import React from 'react'
import {Currency, Product, useCurrency} from "../../../../entities"
import s from './ProductSticker.module.scss'
import Barcode from "react-barcode"

export const ProductSticker = (props: { product: Product, cur: Currency }) => {

    const r = useCurrency(c => c.roundUp)
    return (
        <div className={s.wrapper}>
            <div className={s.name}>
                {props.product.name.length > 57 ? props.product.name.slice(0, 56) + '...' : props.product.name}
            </div>
            <Barcode value={props.product.barcode} format={"EAN13"} height={60}/>
            <div className={s.price}>
                {r(props.product.retailPrice * props.cur.coefficient) + props.cur.symbol}
            </div>
        </div>
    )
}