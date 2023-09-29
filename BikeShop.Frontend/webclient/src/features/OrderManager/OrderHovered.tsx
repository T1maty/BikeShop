import React from 'react';
import s from "./OrderManager.module.scss";
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";

const OrderHovered = (props: { order: OrderWithProducts }) => {


    let mainButton: JSX.Element = <div></div>
    let subButton: JSX.Element = <div></div>

    if (props.order.order.orderStatus === "Created") {
        mainButton = (
            <div className={s.order_third_row_action_main}>
                Підтвердити
            </div>)

        subButton = (
            <div className={s.order_third_row_action_main}>
                Підтвердити
            </div>)
    }

    if (props.order.order.orderStatus === "WaitingForPayment") {
        return (
            <div className={s.order_third_row_action_main}>
                Оплата
            </div>)
    }

    if (props.order.order.orderStatus === "WaitingForCollection") {
        return (
            <div className={s.order_third_row_action_main}>
                Укомплектовано!
            </div>)
    }

    if (props.order.order.orderStatus === "WaitingLogistic") {
        return (
            <div className={s.order_third_row_action_main}>
                Товари отримано!
            </div>)
    }

    if (props.order.order.orderStatus === "ReadyInShop") {
        return (
            <div className={s.order_third_row_action_main}>
                Видати замовлення
            </div>)
    }

    if (props.order.order.orderStatus === "WaitingForShipping") {
        return (
            <div className={s.order_third_row_action_main}>
                Відправлено
            </div>)
    }

    if (props.order.order.orderStatus === "Shipped") {
        return (
            <div className={s.order_third_row_action_main}>
                Доставлено
            </div>)
    }

    return (
        <div className={s.order_third_row}>
            <div className={s.order_third_row_crm}>
                1
            </div>
            <div className={s.order_third_row_action}>
                {mainButton}
                {subButton}
            </div>
        </div>
    );
};

export default OrderHovered;