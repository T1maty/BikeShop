import React from 'react'
import s from '../../WorkActs/ActGetStuffService.module.scss'
import {ServiceWithData, useAuth} from "../../../../entities"
import {formatDate} from "../../../../shared/utils/formatDate"
import {InvoiceHeader} from "./InvoiceHeader"

export const ServiceIncomeInvoice = (props: { children: ServiceWithData }) => {

    const shop = useAuth(s => s.shop)

    let fio = props.children.service.clientFIO.split(' ')

    while (fio.length < 3) fio.push('')

    return (
        <div className={s.workAct_wrapper}>
            <div className={s.workAct_mainBox}>

                <InvoiceHeader fn={fio[0]} ln={fio[1]} ptr={fio[2]} phone={props.children.service.clientPhone}
                               shop={shop!}/>

                <div className={s.workAct_date}>
                    <div className={s.date_title}>
                        Акт прийому техніки до майстерні
                    </div>
                    <div className={s.date_title}>
                        № {props.children.service.id}
                    </div>
                    <div className={s.date_date}>
                        від {formatDate(props.children.service.createdAt)}
                    </div>
                </div>

                <div className={s.workAct_title}>
                    <div className={s.title_title}>
                        На ремонт до майстерні передано:
                    </div>
                    <div className={s.title_info}>
                        {props.children.service.name}
                    </div>
                </div>

                <div className={s.client_info}>
                    <div className={s.info_title}>
                        Побажання замовника:
                    </div>
                    <div className={s.info_content}>
                        {props.children.service.clientDescription}
                    </div>
                </div>
                <div className={s.agreement_policy}>
                    Цей акт підтверджує на передачу зазначеної техніки клієнта на ремонт до майстерні, для надання
                    послуг з ремонту та обслуговування.
                </div>
                <div className={s.shop_signature}>
                    <div style={{fontWeight: 'bold'}}>Підпис співробітника</div>
                    <div>{props.children.service.userFIO}</div>
                </div>
                <br/>
                <br/>
                <div className={s.client_signature}>
                    <div style={{fontWeight: 'bold'}}>Підпис клієнта</div>
                    <div>{props.children.service.clientFIO}</div>
                </div>
            </div>
        </div>
    )
}