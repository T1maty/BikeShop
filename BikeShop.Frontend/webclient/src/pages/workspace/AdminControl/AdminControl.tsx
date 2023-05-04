import React, {useEffect, useState} from 'react'
import s from './AdminControl.module.scss'
import {AdminControlSalary} from './AdminControlSalary'

type MenuItemType = 'Salary' | 'Analytics' | 'Other'

export const AdminControl = () => {

    const [menuItem, setMenuItem] = useState<MenuItemType>('Salary')
    const [isMenuSalaryActive, setIsMenuSalaryActive] = useState<boolean>(false)
    const [isMenuAnalyticsActive, setIsMenuAnalyticsActive] = useState<boolean>(false)
    const [isMenu3Active, setIsMenu3Active] = useState<boolean>(false)

    const chooseMenuItemHandler = (menuTitle: MenuItemType, isMenuInfoActive: boolean,
                                   isMenuWorkActive: boolean, isMenu3Active: boolean) => {
        setMenuItem(menuTitle)
        setIsMenuSalaryActive(isMenuInfoActive)
        setIsMenuAnalyticsActive(isMenuWorkActive)
        setIsMenu3Active(isMenu3Active)
    }

    useEffect(() => {
        setIsMenuSalaryActive(true)
    }, [])

    return (
        <div className={s.stuffProfileMainBlock}>
            <div className={s.profile_navMenu}>
                <div className={isMenuSalaryActive ? s.activeMenu : ''}
                     onClick={() => {chooseMenuItemHandler('Salary',
                         true, false, false)}}
                >
                    Зарплаты
                </div>
                <div className={isMenuAnalyticsActive ? s.activeMenu : ''}
                     onClick={() => {chooseMenuItemHandler('Analytics',
                         false, true, false)}}
                >
                    Аналитика
                </div>
                <div className={isMenu3Active ? s.activeMenu : ''}
                     onClick={() => {chooseMenuItemHandler('Other',
                         false, false, true)}}
                >
                    Ещё один пункт
                </div>
            </div>

            <div className={s.profile_content}>
                <div className={s.content_info}>
                    {
                        isMenuSalaryActive ? <AdminControlSalary/> : ''
                    }
                    {
                        isMenuAnalyticsActive ? <div>Ещё один пункт меню</div> : ''
                    }
                    {
                        isMenu3Active ? <div>Ещё один пункт меню</div> : ''
                    }
                </div>
            </div>
        </div>
    )
}