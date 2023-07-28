import React from 'react';
import s from "./OrderManager.module.scss";
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";

const ColumnOrder = (props: { order: OrderWithProducts }) => {
    return (
        <div className={s.column_order}>
            <div className={s.order_first_row}>
                <div className={s.first_row_number}>
                    <div>№</div>
                    <div className={s.first_row_number_number}>{props.order.order.id}</div>
                </div>
                <div className={s.first_row_status}>
                    {props.order.order.orderStatus}
                </div>
            </div>
            <div className={s.order_second_row}>
                <div className={s.second_row_column1}>
                    <div className={s.second_row_column1_data}>
                        <div className={s.second_row_column1_title}>
                            Всього:
                        </div>
                        <div className={s.second_row_column1_info}>
                            {props.order.order.totalPrice}грн
                        </div>
                    </div>
                    <div className={s.second_row_column1_data}>
                        <div className={s.second_row_column1_title}>
                            Одиниць:
                        </div>
                        <div className={s.second_row_column1_info}>
                            {props.order.order.totalPrice}
                        </div>
                        <div className={s.second_row_column1_title}>
                            шт.
                        </div>
                    </div>
                    <div className={s.second_row_column1_time}>time</div>
                </div>
                <div className={s.second_row_column2}>
                    <div className={s.second_row_column2_button}>button</div>
                    <div className={s.second_row_column2_payment}>payment</div>
                </div>
            </div>
        </div>
    );
};

export default ColumnOrder;