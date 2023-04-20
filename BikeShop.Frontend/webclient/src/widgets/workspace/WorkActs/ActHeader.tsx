import React from 'react'
import s from './ActHeader.module.scss'

interface ActHeaderProps {
    title: string
}

export const ActHeader: React.FC<ActHeaderProps> = ({title}) => {
    return (
        <>
            <div className={s.workAct_header}>
                <div className={s.header_customer}>
                    <div className={s.header_title}>Заказчик</div>
                    <div className={s.header_content}>
                        <div>Иванов</div>
                        <div>Василий</div>
                        <div>Петрович</div>
                        <div>8-9033-11-22-33</div>
                    </div>
                </div>
                <div className={s.header_master}>
                    <div className={s.header_title}>Исполнитель</div>
                    <div className={s.header_content}>
                        <div>BikeShop666</div>
                        <div>г.Киев, ул.Выдуманная, 999, д.5</div>
                        <div>BikeShop59.store</div>
                        <div>8-9033-11-22-33</div>
                    </div>
                </div>
            </div>

            <div className={s.workAct_date}>
                <div className={s.date_title}>
                    {title} №999
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
        </>
    )
}