import React from 'react';
import s from "./OrderManager.module.scss";
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";

const OrderUnhovered = (props: { order: OrderWithProducts }) => {
    return (
        <div className={s.order_second_row}>
            <div className={s.order_second_row_user}>
                1
            </div>
            <div className={s.order_second_row_data}>
                <div className={s.order_second_row_data_numbers}>
                    <div className={s.order_second_row_data_numbers_quantity}>
                        <div style={{fontSize: "10px"}}>Товарів:</div>
                        <div style={{fontWeight: "600"}}>33шт.</div>
                    </div>
                    <div className={s.order_second_row_data_numbers_price}>
                        <div style={{fontSize: "10px"}}>До сплати:</div>
                        <div style={{fontWeight: "600"}}>94324₴</div>
                    </div>
                </div>
                <div className={s.order_second_row_data_status}>
                    Не сплачено
                </div>
                <div className={s.order_second_row_data_delivery}>
                    Доставка НоваПочка
                </div>
            </div>
        </div>
    );
};

export default OrderUnhovered;