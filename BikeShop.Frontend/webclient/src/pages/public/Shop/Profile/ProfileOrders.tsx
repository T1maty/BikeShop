import React, {useState, useEffect} from 'react'
import s from './ProfileOrders.module.scss'

type ProfileOrderStatus = 'WaitingPayment' | 'WaitingPackage' | 'Ready' | 'Canceled'

export const ProfileOrders = () => {

    const [isCollapsedItem, setIsCollapsedItem] = useState<boolean>(false)

    return (
        <div className={s.profileOrders_mainBox}>
            <div className={s.profileOrders_title}>Мои заказы</div>
            <div className={s.profileOrders_content} onClick={() => {setIsCollapsedItem(true)}}>

                <div className={s.profileOrders_orderItem}>
                    <div className={s.orderItem_status}>
                        <div className={s.status_color}>i</div>
                        <div className={s.status_data}>
                            <div className={s.status_data_date}>№999 от 1 января 2023 года</div>
                            <div className={s.status_data_text}>Ожидает комплектации</div>
                        </div>
                    </div>
                    <div className={s.orderItem_sum}>
                        <div className={s.sum_price}>Сумма: 999</div>
                        <div className={s.sum_result}>Оплата: <span>Оплачено</span></div>
                    </div>
                    <div className={s.orderItem_icons}>
                        <div className={s.icons_one}>i</div>
                        <div className={s.icons_two}>i</div>
                    </div>
                </div>

            </div>
        </div>
    )
}