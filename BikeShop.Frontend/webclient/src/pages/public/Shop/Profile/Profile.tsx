import React, {useState, useEffect} from 'react'
import s from './Profile.module.scss'

export const Profile = () => {
    return (
        <div className={s.profile_mainBox}>
            <div className={s.profile_menu}>
                <div className={s.menu_user}>
                    <div className={s.user_image}>U</div>
                    <div className={s.user_info}>
                        <div className={s.info_name}>Петров Василий Иванович</div>
                        <div>Здесь будет какая-то информация</div>
                    </div>
                </div>
                <div className={s.menu_list}>
                    <div>Заказы</div>
                    <div>Ремонты</div>
                    <div>Покупки</div>
                </div>
            </div>
            <div className={s.profile_content}>
            </div>
        </div>
    )
}