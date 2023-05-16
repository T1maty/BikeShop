import React from 'react'
import s from './ActGetStuffService.module.scss'
import {ActHeader} from "./ActHeader"
import {ServiceWithData} from "../../../entities"

export const ActGetStuffFromService = (props: { children: ServiceWithData | null }) => {

    return (
        <div className={s.workAct_wrapper}>
            <div className={s.workAct_mainBox}>

                <ActHeader title={'Акт передачи техники владельцу'}/>

                <div className={s.agreement_policy}>
                    С правилами и условиями настоящего Соглашения в полном объеме
                    до начала использования Сервиса ознакомлен и согласен
                </div>
                <div className={s.shop_signature}>
                    <div style={{fontWeight: 'bold'}}>Подпись сотрудника</div>
                    <div>Петров Иван Васильевич</div>
                </div>
                <div className={s.client_signature}>
                    <div style={{fontWeight: 'bold'}}>Подпись клиента</div>
                    <div>Васильев Иван Петрович</div>
                </div>
            </div>
        </div>
    )
}