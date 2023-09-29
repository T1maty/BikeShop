import React, {useEffect} from 'react'
import s from './OrderManager.module.scss'
import ColumnOrder from "./ColumnOrder";
import OrderModal from "../OrderModal/OrderModal";
import useOrderManager from "./OrderManagerStore";

const OrderManager = () => {

    const data = useOrderManager(s => s.orders)
    const getOrders = useOrderManager(s => s.getOrders)

    const newOrders = data.filter(n => n.order.orderStatus === "Created")
    const processing = data.filter(n => n.order.orderStatus === "1")
    const finishing = data.filter(n => n.order.orderStatus === "2")
    useEffect(() => {
        getOrders()
    }, [])
    return (
        <div className={s.wrapper}>
            <OrderModal/>
            <div className={s.main_block}>
                <div className={s.column}>
                    <div className={s.column_name}>Нове замовлення</div>
                    <div className={s.column_add_button}>+</div>
                    <div className={s.column_orders}>
                        {newOrders.map((n) => {
                            return (
                                <ColumnOrder order={n}/>
                            )
                        })}
                    </div>
                </div>
                <div className={s.column}>
                    <div className={s.column_name}>В обробці</div>
                    <div className={s.column_orders}>
                        {processing.map((n) => {
                            return (
                                <ColumnOrder order={n}/>
                            )
                        })}
                    </div>
                </div>
                <div className={s.column}>
                    <div className={s.column_name}>Завершення</div>
                    <div className={s.column_orders}>
                        {finishing.map((n) => {
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