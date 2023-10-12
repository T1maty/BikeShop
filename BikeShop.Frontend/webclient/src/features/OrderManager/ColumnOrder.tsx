import React, {useState} from 'react';
import s from "./OrderManager.module.scss";
import {OrderWithProducts} from "../../entities/entities/Order/OrderWithProducts";
import OrderHovered from "./OrderHovered";
import OrderUnhovered from "./OrderUnhovered";
import useOrderManager from "./OrderManagerStore";
import useOrderModal from "../../widgets/workspace/Orders/OrderModal/OrderModalStore";

const ColumnOrder = (props: { order: OrderWithProducts }) => {

    const [hover, setHover] = useState(false)
    const getStatusString = useOrderManager(s => s.getStatusString)
    const openOrderModal = useOrderModal(s => s.openOrderModal)
    const setCurrentOrder = useOrderManager(s => s.setCurrentOrder)


    return (
        <div className={s.column_order} onMouseEnter={() => {
            setHover(true)
        }} onMouseLeave={() => {
            setHover(false)
        }} onClick={() => {
            setCurrentOrder(props.order)
        }}>
            <div className={s.order_first_row}>
                <div className={s.first_row_number}>
                    <div>№</div>
                    <div className={s.first_row_number_number}>{props.order.order.id}</div>
                </div>
                <div onClick={() => openOrderModal(props.order)} className={s.first_row_status}
                     style={getStatusString(props.order.order.orderStatus).style}>
                    {getStatusString(props.order.order.orderStatus).s}
                </div>
            </div>
            {hover ? <OrderHovered order={props.order}/> : <OrderUnhovered order={props.order}/>}
        </div>
    );
};

export default ColumnOrder;