import React from 'react'
import s from './ActServiceWork.module.scss'
import {ActHeader} from "./ActHeader"

export const ActServiceWork = () => {

    return (
        <div className={s.workAct_wrapper}>
            <div className={s.workAct_mainBox}>

                <ActHeader title={'Акт выполненных работ'}/>

                <div className={s.workAct_works}>
                    <div className={s.works_content}>
                        Таблица
                    </div>
                    <div className={s.works_result}>
                        <div>Всего услуг: <span style={{fontWeight: 'bold'}}>9999 Р</span></div>
                        <div>Скидка: <span style={{fontWeight: 'bold'}}>999 Р</span></div>
                    </div>
                </div>
                <div className={s.workAct_products}>
                    <div className={s.works_content}>
                        Таблица
                    </div>
                    <div className={s.works_result}>
                        <div>Всего товаров: <span style={{fontWeight: 'bold'}}>9999 Р</span></div>
                        <div>Скидка: <span style={{fontWeight: 'bold'}}>999 Р</span></div>
                    </div>
                </div>
                <div className={s.workAct_discount}>
                    <div>Сумма без скидки: <span style={{fontWeight: 'bold'}}>9999 Р</span></div>
                    <div>Скидка: <span style={{fontWeight: 'bold'}}>999 Р</span></div>
                </div>
                <div className={s.workAct_result}>
                    К оплате: 10 999 $
                </div>
            </div>
        </div>
    )
}