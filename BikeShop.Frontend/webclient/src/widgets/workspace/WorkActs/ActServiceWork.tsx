import React from 'react'
import s from './ActServiceWork.module.scss'
import {ServiceWithData, useAuth, useCurrency} from "../../../entities"
import {InvoiceHeader} from "../Invoices/Service/InvoiceHeader";

export const ActServiceWork = (props: { children: ServiceWithData }) => {

    const shop = useAuth(s => s.shop)
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    let fio = props.children.service.clientFIO.split(' ')
    while (fio.length < 3) fio.push('')

    return (
        <div className={s.workAct_wrapper}>
            <div className={s.workAct_mainBox}>

                <InvoiceHeader fn={fio[0]} ln={fio[1]} ptr={fio[2]} phone={props.children.service.clientPhone}
                               shop={shop!}/>

                <br/>
                <div className={s.title}>
                    Акт виконаних робіт №{props.children.service.id}
                </div>
                <div>
                    Замовник підтверджує отримання послуг в повному обсязі, та не має зауважень до виконаної роботи.
                </div>
                <br/>
                <br/>
                <div style={{fontWeight: 'bold'}}>Підпис замовника</div>
                <hr color={'black'}/>
                <div>{props.children.service.clientFIO}</div>
            </div>
        </div>
    )
}