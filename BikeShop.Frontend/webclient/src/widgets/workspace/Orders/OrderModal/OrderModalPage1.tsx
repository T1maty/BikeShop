import React, {useState} from 'react';
import s from './OrderModal.module.scss'
import useOrderManager from "../../../../features/OrderManager/OrderManagerStore";
import {LocalStorage, useCurrency} from "../../../../entities";
import {AsyncSelectSearchEmployee} from "../../../../shared/ui/AsyncSelectSearch/AsyncSelectSearchEmployee";
import {UserWithRoles} from "../../../../entities/models/Auth/UserWithRoles";

const OrderModalPage1 = () => {
    const co = useOrderManager(s => s.currentOrder)

    const r = useCurrency(s => s.roundUp)
    const fbts = useCurrency(s => s.fromBaseToSelected)

    const [u, su] = useState<UserWithRoles | null>(null)
    if (co == null) return <></>;
    return (
        <div className={s.page1}>
            <div className={s.client}>
                <div className={s.name}>
                    <div style={{fontSize: "12px", fontWeight: "400", paddingRight: "5px"}}>Клієнт:</div>
                    <div>{co.client.lastName + " " + co.client.firstName + " " + co.client.patronymic}</div>
                </div>
                <div className={s.info}>
                    <div className={s.balance}>
                        <div style={{fontSize: "12px", fontWeight: "400"}}>Баланс:</div>
                        <div>{r(co.client.balance * fbts.c) + fbts.s}</div>
                    </div>
                    <div className={s.phone}>{co.client.phoneNumber}</div>
                </div>
                <div className={s.description}>
                    <div className={s.desc_label}>Інформація від замовника:</div>
                    <div className={s.desc_value}>{co.order.descriptionCilent}</div>
                </div>
            </div>
            <div className={s.manager_select}>
                <AsyncSelectSearchEmployee onSelect={() => {
                }} value={u} setValue={su} shopId={parseFloat(LocalStorage.shopId()!)}/>
            </div>
            <div className={s.crm}>CRM</div>
        </div>
    );
};

export default OrderModalPage1;