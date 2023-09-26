import React from 'react';
import s from "./OrderManager.module.scss";
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";

const OrderHovered = (props: { order: OrderWithProducts }) => {
    return (
        <div className={s.order_third_row}>

        </div>
    );
};

export default OrderHovered;