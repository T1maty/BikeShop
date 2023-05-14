import React, {useState, useEffect} from 'react'
import s from './Profile.module.scss'
import {ProfileInfo} from './ProfileInfo'
import {ProfileOrders} from './ProfileOrders'
import {ProfilePurchases} from './ProfilePurchases'
import {ProfileServices} from './ProfileServices'
import {ProfileAvatar} from './ProfileAvatar'
import {useAuth} from '../../../../entities'
import {ShopLoader} from "../../../../shared/ui"
import {useSnackbar} from "notistack"

type MenuItemType = 'Profile' | 'Orders' | 'Services' | 'Purchases'

export const Profile = () => {

    const {enqueueSnackbar} = useSnackbar()

    const user = useAuth(s => s.user)
    const isLoading = useAuth(s => s.isLoading)
    const setIsLoading = useAuth(s => s.setIsLoading)
    const errorStatus = useAuth(s => s.errorStatus)
    const setErrorStatus = useAuth(s => s.setErrorStatus)

    const [menuItem, setMenuItem] = useState<MenuItemType>('Orders')
    const [isActiveProfile, setIsActiveProfile] = useState<boolean>(false)
    const [isActiveOrders, setIsActiveOrders] = useState<boolean>(false)
    const [isActiveServices, setIsActiveServices] = useState<boolean>(false)
    const [isActivePurchases, setIsActivePurchases] = useState<boolean>(false)

    const chooseMenuItemHandler = (menuTitle: MenuItemType, isActiveProfile: boolean,
                                   isActiveOrders: boolean, isActiveServices: boolean,
                                   isActivePurchases: boolean) => {
        setMenuItem(menuTitle)
        setIsActiveProfile(isActiveProfile)
        setIsActiveOrders(isActiveOrders)
        setIsActiveServices(isActiveServices)
        setIsActivePurchases(isActivePurchases)
    }

    useEffect(() => {
        setIsActiveProfile(true)
    }, [])

    useEffect(() => {
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
        if (errorStatus === 'success') {
            enqueueSnackbar('Профиль обновлён', {variant: 'success', autoHideDuration: 3000})
        }
    }, [errorStatus])

    if (isLoading) {
        return <ShopLoader/>
    } else {

        return (
            <div className={s.profile_mainBox}>
                <div className={s.container}>

                    <div className={s.profile_menu}>
                        <div className={isActiveProfile ? s.menu_user_active : s.menu_user}
                             onClick={() => {
                                 chooseMenuItemHandler('Orders',
                                     true, false, false, false)
                             }}
                        >
                            <ProfileAvatar user={user!}/>
                            <div className={s.user_info}>
                                <div className={s.info_name}>
                                    {user!.lastName ? user!.lastName : 'Введите'} {user!.firstName ? user!.firstName : 'Ваше'} {user!.patronymic ? user!.patronymic : 'Имя'}
                                </div>
                                <div className={s.info_text}>Здесь будет какая-то информация</div>
                            </div>
                        </div>
                        <div className={s.menu_list}>
                            <div className={isActiveOrders ? s.menu_listItem_active : s.menu_listItem}
                                 onClick={() => {
                                     chooseMenuItemHandler('Orders',
                                         false, true, false, false)
                                 }}
                            >
                                <div className={s.listItem_icon}>I</div>
                                <div className={s.listItem_title}>Заказы</div>
                            </div>
                            <div className={isActiveServices ? s.menu_listItem_active : s.menu_listItem}
                                 onClick={() => {
                                     chooseMenuItemHandler('Services',
                                         false, false, true, false)
                                 }}
                            >
                                <div className={s.listItem_icon}>I</div>
                                <div className={s.listItem_title}>Ремонты</div>
                            </div>
                            <div className={isActivePurchases ? s.menu_listItem_active : s.menu_listItem}
                                 onClick={() => {
                                     chooseMenuItemHandler('Purchases',
                                         false, false, false, true)
                                 }}
                            >
                                <div className={s.listItem_icon}>I</div>
                                <div className={s.listItem_title}>Покупки</div>
                            </div>
                        </div>
                    </div>
                    <div className={s.profile_content}>
                        {
                            isActiveProfile ? <ProfileInfo user={user!}
                                                           setIsLoading={setIsLoading}
                                                           setErrorStatus={setErrorStatus}
                                              /> : ''
                        }
                        {
                            isActiveOrders ? <ProfileOrders/> : ''
                        }
                        {
                            isActiveServices ? <ProfileServices/> : ''
                        }
                        {
                            isActivePurchases ? <ProfilePurchases/> : ''
                        }
                    </div>

                </div>
            </div>
        )
    }
}