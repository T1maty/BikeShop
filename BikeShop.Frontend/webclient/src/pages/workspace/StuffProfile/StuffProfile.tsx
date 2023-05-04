import React, {useEffect, useState} from 'react'
import s from './StuffProfile.module.scss'
import {useAuth} from "../../../entities"
import {CustomInput} from "../../../shared/ui"
import {StuffProfileInfo} from "./StuffProfileInfo"
import {StuffProfileWork} from "./StuffProfileWork"

type MenuItemType = 'Personal' | 'Work' | 'Other'

export const StuffProfile = () => {

    const user = useAuth(s => s.user)

    const [text, setText] = useState<string>('')

    const [menuItem, setMenuItem] = useState<MenuItemType>('Personal')
    const [isMenuInfoActive, setIsMenuInfoActive] = useState<boolean>(false)
    const [isMenuWorkActive, setIsMenuWorkActive] = useState<boolean>(false)
    const [isMenu3Active, setIsMenu3Active] = useState<boolean>(false)

    const chooseMenuItemHandler = (menuTitle: MenuItemType, isMenuInfoActive: boolean,
                                   isMenuWorkActive: boolean, isMenu3Active: boolean) => {
        setMenuItem(menuTitle)
        setIsMenuInfoActive(isMenuInfoActive)
        setIsMenuWorkActive(isMenuWorkActive)
        setIsMenu3Active(isMenu3Active)
    }

    useEffect(() => {
        setIsMenuInfoActive(true)
    }, [])

    return (
        <div className={s.stuffProfileMainBlock}>
            <div className={s.profile_navMenu}>
                <div className={isMenuInfoActive ? s.activeMenu : ''}
                     onClick={() => {chooseMenuItemHandler('Personal',
                         true, false, false)}}
                >
                    Персональная информация
                </div>
                <div className={isMenuWorkActive ? s.activeMenu : ''}
                     onClick={() => {chooseMenuItemHandler('Work',
                         false, true, false)}}
                >
                    Отработка
                </div>
                <div className={isMenu3Active ? s.activeMenu : ''}
                     onClick={() => {chooseMenuItemHandler('Other',
                         false, false, true)}}
                >
                    Ещё один пункт
                </div>
            </div>

            <div className={s.profile_content}>
                <div className={s.content_title}>
                    <div className={s.title_name}>
                        {user && user.lastName} {user && user.firstName} {user && user.patronymic}
                    </div>
                    <CustomInput
                        value={text}
                        onChange={(e) => { setText(e.currentTarget.value) }}
                        placeholder={'Какая-то информация'}
                        divClassName={s.title_textInput}
                    />
                </div>
                <div className={s.content_info}>
                    {
                        isMenuInfoActive ? <StuffProfileInfo user={user!}/> : ''
                    }
                    {
                        isMenuWorkActive ? <StuffProfileWork user={user!}/> : ''
                    }
                    {
                        isMenu3Active ? <div>Ещё один пункт меню</div> : ''
                    }
                </div>
            </div>
        </div>
    )
}