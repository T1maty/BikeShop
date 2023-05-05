import React from 'react';
import {Currency, Product} from "../../../../entities";
import s from './ProductSticker.module.scss'
import Barcode from "react-barcode";

const ProductSticker = (props: { product: Product, cur: Currency }) => {


    return (
        <div className={s.wrapper}>
            <div className={s.name}>{props.product.name}</div>
            <Barcode value={props.product.barcode} format={"EAN13"} height={60}/>
            <div className={s.price}>{props.product.retailPrice * props.cur.coefficient + props.cur.symbol}</div>
        </div>
    );
};

export default ProductSticker;