import React from 'react'
import s from './LoginBlock.module.scss'
import {ProfileAvatar} from '../Profile/ProfileAvatar'
import profile from '../../../../shared/assets/shop/icons/profile.png'
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import useAuthUser from "../../../auth/useAuthUser";

interface LoginBlockProps {
    isAuth: boolean
    userLastName: string
    userFirstName: string
}

export const LoginBlock: React.FC<LoginBlockProps> = ({isAuth, userLastName, userFirstName}) => {

    const navigate = useNavigate()
    const logout = useAuthUser(s => s.logout)

    return (
        <div className={s.loginBlock_mainBox}>
            {
                isAuth ?
                    <div className={s.right_userInfo} onClick={() => {
                        navigate(BikeShopPaths.SHOP.PROFILE)
                    }}>
                        <ProfileAvatar lastName={userLastName} firstName={userFirstName}/>
                        <div>{userLastName} {''} {userFirstName}</div>
                    </div>
                    :
                    <div className={s.right_loginBlock}>
                        <div className={s.loginBlock_profileIcon}>
                            <img src={profile} alt="profile-logo"/>
                        </div>
                        <div className={s.loginBlock_enter}
                             onClick={() => {
                                 logout()
                                 navigate(BikeShopPaths.COMMON.LOGIN)
                             }}
                        >
                            Вход
                        </div>
                        <div className={s.loginBlock_registration}
                             onClick={() => {
                                 navigate(BikeShopPaths.COMMON.REGISTRATION)
                             }}
                        >
                            Регистрация
                        </div>
                    </div>
            }
        </div>
    )
}