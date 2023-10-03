import React from 'react';
import s from "./OrderManager.module.scss";
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";
import icon from './../../shared/assets/workspace/icons8-phone-400.svg'
import useOrderManager from "./OrderManagerStore";

const OrderHovered = (props: { order: OrderWithProducts }) => {
    const confirm = useOrderManager(s => s.confirm)
    const collected = useOrderManager(s => s.collected)

    let mainButton: JSX.Element = <div></div>
    let subButton: JSX.Element = <div></div>

    if (props.order.order.orderStatus === "Created") {
        mainButton = (
            <div className={s.order_third_row_action_main} onClick={() => {
                confirm(props.order.order.id)
            }}>
                Підтвердити
            </div>)

        subButton = (
            <div className={s.order_third_row_action_third}>
                Відмінити
            </div>)
    }

    if (props.order.order.orderStatus === "WaitingForPayment") {
        mainButton = (
            <div className={s.order_third_row_action_main} onClick={() => {
                confirm(props.order.order.id)
            }}>
                Оплатити
            </div>)

        subButton = (
            <div className={s.order_third_row_action_third}>
                Відмінити
            </div>)
    }

    if (props.order.order.orderStatus === "WaitingForCollection") {
        mainButton = (
            <div className={s.order_third_row_action_main} onClick={() => {
                collected(props.order.order.id)
            }}>
                Укомплектовано
            </div>)

        subButton = (
            <div className={s.order_third_row_action_second}>
                Очікування логістики
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
        mainButton = (
            <div className={s.order_third_row_action_main} onClick={() => {
                collected(props.order.order.id)
            }}>
                Відправлено
            </div>)

        subButton = (
            <div className={s.order_third_row_action_second}>
                Створити ТТН
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
                <div className={s.order_third_row_crm_actions}>
                    <img src={icon} className={s.order_third_row_crm_actions_call}/>
                </div>
                <div className={s.order_third_row_crm_last}></div>
            </div>
            <div className={s.order_third_row_action}>
                {mainButton}
                {subButton}
            </div>
        </div>
    );
};

export default OrderHovered;