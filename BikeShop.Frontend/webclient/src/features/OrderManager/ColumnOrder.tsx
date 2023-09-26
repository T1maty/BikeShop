import React, {useState} from 'react';
import s from "./OrderManager.module.scss";
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";
import OrderHovered from "./OrderHovered";
import OrderUnhovered from "./OrderUnhovered";

const ColumnOrder = (props: { order: OrderWithProducts }) => {

    const [hover, setHover] = useState(false)


    return (
        <div className={s.column_order} onMouseEnter={() => {
            setHover(true)
        }} onMouseLeave={() => {
            setHover(false)
        }}>
            <div className={s.order_first_row}>
                <div className={s.first_row_number}>
                    <div>№</div>
                    <div className={s.first_row_number_number}>{props.order.order.id}</div>
                </div>
                <div className={s.first_row_status}>
                    {props.order.order.orderStatus}
                </div>
            </div>
            {hover ? <OrderHovered order={props.order}/> : <OrderUnhovered order={props.order}/>}
        </div>
    );
};

export default ColumnOrder;