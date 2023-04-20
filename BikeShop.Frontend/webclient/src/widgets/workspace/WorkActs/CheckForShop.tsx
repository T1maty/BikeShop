import React from 'react'
import s from './CheckStyles.module.scss'

export const CheckForShop = () => {

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
                <div className={s.workAct_works}>
                    <div className={s.works_content}>
                        Таблица
                    </div>
                    <div className={s.works_result}>
                        <div>Всего услуг: <span style={{fontWeight: 'bold'}}>9999 Р</span></div>
                        <div>Скидка: <span style={{fontWeight: 'bold'}}>999 Р</span></div>
                    </div>
                </div>
                <div className={s.workAct_result}>
                    К оплате: 10 999 $
                </div>

            </div>
        </div>
    )
}