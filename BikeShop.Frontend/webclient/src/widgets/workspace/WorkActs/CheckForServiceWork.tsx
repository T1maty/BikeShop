import React from 'react'
import s from './CheckStyles.module.scss'

export const CheckForServiceWork = () => {

    return (
        <div className={s.workAct_wrapper}>
            <div className={s.workAct_mainBox}>

                <div className={s.workAct_date}>
                    <div className={s.date_title}>
                        Чек №999
                    </div>
                    <div className={s.date_date}>
                        от 01 января 2020
                    </div>
                </div>
                <div className={s.workAct_title}>
                    <div className={s.title_title}>
                        Ремонтируемая техника:
                    </div>
                    <div className={s.title_info}>
                        Specialized Pro 2023
                    </div>
                </div>

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