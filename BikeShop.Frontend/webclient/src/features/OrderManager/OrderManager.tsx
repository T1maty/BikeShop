import React, {useEffect} from 'react'
import s from './OrderManager.module.scss'
import ColumnOrder from "./ColumnOrder";
import OrderModal from "../OrderModal/OrderModal";
import useOrderManager from "./OrderManagerStore";
import useCreateOrderModal from "../../widgets/workspace/Orders/CreateOrderModal/CreateOrderModalStore";
import CreateOrderModal from "../../widgets/workspace/Orders/CreateOrderModal/CreateOrderModal";

const OrderManager = () => {

    const data = useOrderManager(s => s.orders)
    const getOrders = useOrderManager(s => s.getOrders)

    const newOrders = data.filter(n => n.order.orderStatus === "Created" || n.order.orderStatus === "WaitingForPayment")
    const processing = data.filter(n => n.order.orderStatus === "WaitingForCollection" || n.order.orderStatus === "WaitingLogistic" || n.order.orderStatus === "WaitingForShipping")
    const finishing = data.filter(n => n.order.orderStatus === "ReadyInShop" || n.order.orderStatus === "Shipped")
    const setOpen = useCreateOrderModal(s => s.setOpen)

    useEffect(() => {
        getOrders()
    }, [])
    return (
        <div className={s.wrapper}>
            <OrderModal/>
            <CreateOrderModal/>
            <div className={s.main_block}>
                <div className={s.column}>
                    <div className={s.column_name}>Нове замовлення</div>
                    <div className={s.column_add_button} onClick={() => {
                        setOpen(true)
                    }}>+
                    </div>
                    <div className={s.column_orders}>
                        {newOrders.map((n, ind) => {
                            return (
                                <ColumnOrder order={n} key={ind}/>
                            )
                        })}
                    </div>
                </div>
                <div className={s.column}>
                    <div className={s.column_name}>В обробці</div>
                    <div className={s.column_orders}>
                        {processing.map((n, ind) => {
                            return (
                                <ColumnOrder order={n} key={ind}/>
                            )
                        })}
                    </div>
                </div>
                <div className={s.column}>
                    <div className={s.column_name}>Завершення</div>
                    <div className={s.column_orders}>
                        {finishing.map((n, ind) => {
                            return (
                                <ColumnOrder order={n} key={ind}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManager;