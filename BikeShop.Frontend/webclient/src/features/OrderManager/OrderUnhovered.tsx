import React from 'react';
import s from "./OrderManager.module.scss";
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";
import {useCurrency} from "../../entities";
import useOrderManager from "./OrderManagerStore";

const OrderUnhovered = (props: { order: OrderWithProducts }) => {
    const getDeliveryString = useOrderManager(s => s.getDeliveryString)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)


    const prodQuant: string = props.order.products.length + ' поз.';
    const total: string = r(props.order.order.totalPrice * fbts.c) + fbts.s;

    let isPayedStyle = {}
    let isPayed: string = ""
    if (props.order.order.isPayed) {
        isPayedStyle = {backgroundColor: "#00752a"}
        isPayed = "Сплачено"
    } else {
        isPayedStyle = {backgroundColor: "#ff6161"}
        isPayed = "Не сплачено"
    }

    const manager: string = props.order.manager != null ? props.order.manager.lastName + ' ' + props.order.manager.firstName[0] + "." + props.order.manager.patronymic[0] + "." : "Не обрано";

    const created = new Date(props.order.order.createdAt).toLocaleString(undefined, {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <div className={s.order_second_row}>
            <div className={s.order_second_row_user}>
                <div className={s.order_second_row_user_manager}>
                    <div style={{fontSize: "10px", fontWeight: "400"}}>Менеджер:</div>
                    <div style={{fontSize: "16px", fontWeight: "600"}}>{manager}</div>
                </div>
                <div className={s.order_second_row_user_timing}>
                    <div style={{fontSize: "10px", fontWeight: "400"}}>Створено:</div>
                    <div style={{color: "#515151", fontSize: "20px", fontWeight: "700"}}>{created}</div>
                </div>
            </div>
            <div className={s.order_second_row_data}>
                <div className={s.order_second_row_data_numbers}>
                    <div className={s.order_second_row_data_numbers_quantity}>
                        <div style={{fontSize: "10px"}}>Позицій:</div>
                        <div style={{fontWeight: "600"}}>{prodQuant}</div>
                    </div>
                    <div className={s.order_second_row_data_numbers_price}>
                        <div style={{fontSize: "10px"}}>До сплати:</div>
                        <div style={{fontWeight: "600"}}>{total}</div>
                    </div>
                </div>
                <div className={s.order_second_row_data_status} style={isPayedStyle}>
                    {isPayed}
                </div>
                <div className={s.order_second_row_data_delivery}>
                    {getDeliveryString(props.order.order.deliveryType)}
                </div>
            </div>
        </div>
    );
};

export default OrderUnhovered;