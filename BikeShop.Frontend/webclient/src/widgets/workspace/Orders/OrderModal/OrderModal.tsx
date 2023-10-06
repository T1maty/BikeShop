import React from 'react';
import {CustomModal} from "../../../../shared/ui";
import useOrderModal from "./OrderModalStore";
import s from './OrderModal.module.scss'
import useOrderManager from "../../../../features/OrderManager/OrderManagerStore";
import OrderModalPage1 from "./OrderModalPage1";
import OrderModalPage3 from "./OrderModalPage3";
import OrderModalPage2 from "./OrderModalPage2";

const OrderModal = () => {
    const open = useOrderModal(s => s.open)
    const setOpen = useOrderModal(s => s.setOpen)
    const setSelectedPage = useOrderModal(s => s.setSelectedPage)
    const selectedPage = useOrderModal(s => s.selectedPage)


    const getStatusString = useOrderManager(s => s.getStatusString)
    const co = useOrderManager(s => s.currentOrder)

    let isPayedStyle = {}
    let isPayed: string = ""
    if (co?.order.isPayed) {
        isPayedStyle = {backgroundColor: "#00752a"}
        isPayed = "Сплачено"
    } else {
        isPayedStyle = {backgroundColor: "#ff6161"}
        isPayed = "Не сплачено"
    }

    if (co == null) return <></>;
    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div className={s.wrapper}>
                <div className={s.header}>
                    <div className={s.header_row1}>
                        <div className={s.header_row1_number}>№{co.order.id}</div>
                        <div className={s.header_row1_status} style={getStatusString(co.order.orderStatus).style}>
                            {getStatusString(co.order.orderStatus).s}</div>
                        <div className={s.header_row1_payment} style={isPayedStyle}>{isPayed}</div>
                    </div>
                    <div className={s.header_row2}>
                        <div className={s.header_row2_data}>12</div>
                        <div className={s.header_row2_button}>12</div>
                    </div>

                </div>

                <div className={s.pageselect}>
                    <div className={s.variant} style={selectedPage === 1 ? {background: "#A5A5A5"} : {}}
                         onClick={() => setSelectedPage(1)}>Клієнт
                    </div>
                    <div className={s.variant} style={selectedPage === 2 ? {background: "#A5A5A5"} : {}}
                         onClick={() => setSelectedPage(2)}>Товари
                    </div>
                    <div className={s.variant} style={selectedPage === 3 ? {background: "#A5A5A5"} : {}}
                         onClick={() => setSelectedPage(3)}>Доставка
                    </div>
                </div>
                {selectedPage === 1 ? <OrderModalPage1/> : selectedPage === 2 ? <OrderModalPage2/> : <OrderModalPage3/>}
            </div>
        </CustomModal>
    );
};

export default OrderModal;