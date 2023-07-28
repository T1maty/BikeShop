import React from 'react'
import s from './OrderManager.module.scss'
import ColumnOrder from "./ColumnOrder";
import OrderModal from "../OrderModal/OrderModal";
import {Order} from "../../entities/entities/Order/Order";
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";

const OrderManager = () => {

    let data = [{
        order: {
            id: 1,
            createdAt: "string",
            updatedAt: "string",
            enabled: true,
            shopId: 1,
            orderType: "string",
            deliveryType: "string",
            deliveryInfo: "string",
            orderStatus: "Очікує підтвердження",
            isPayed: true,
            description: "string",
            descriptionUser: "string",
            discountId: 1,
            totalDiscount: 1,
            totalPrice: 1,
            clientId: "string",
            clientPhone: "string",
            clientFIO: "string",
            clientEmail: "string",
            userId: "string",
            userFIO: "string",
        } as Order, products: []
    } as OrderWithProducts]
    return (
        <div className={s.wrapper}>
            <OrderModal/>
            <div className={s.main_block}>
                <div className={s.column}>
                    <div className={s.column_name}>Нове замовлення</div>
                    <div className={s.column_add_button}>+</div>
                    <div className={s.column_orders}>
                        {data.map((n) => {
                            return (
                                <ColumnOrder order={n}/>
                            )
                        })}
                    </div>
                </div>
                <div className={s.column}>
                    <div className={s.column_name}>В обробці</div>
                    <div className={s.column_orders}>
                        {data.map((n) => {
                            return (
                                <ColumnOrder order={n}/>
                            )
                        })}
                    </div>
                </div>
                <div className={s.column}>
                    <div className={s.column_name}>Завершення</div>
                    <div className={s.column_orders}>
                        {data.map((n) => {
                            return (
                                <ColumnOrder order={n}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManager;