import React, {useState} from 'react'
import s from '../ProductsCount/ProductsWrapper.module.scss'
import {UniTable} from "../../../shared/ui";
import {columns} from "./SupplyInvoiceTableConfig";
import {ChooseProductModal} from "../../../features";

export const ArrivalOfProducts = () => {

    const [data, setData] = useState([]);
    return (
        <div className={s.arrivalOfProducts_rightSide}>

            <ChooseProductModal data={data} addData={setData}/>
            <UniTable rows={data} columns={columns}/>

        </div>
    );
};