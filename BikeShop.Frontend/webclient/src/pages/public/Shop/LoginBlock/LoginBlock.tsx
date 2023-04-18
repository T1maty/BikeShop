import React from 'react'
import s from './LoginBlock.module.scss'
import {ProfileAvatar} from '../Profile/ProfileAvatar'
import ProfileIcon from '../../../../shared/assets/shop/icons/profile-icon-02.svg'
import LoginIcon from '../../../../shared/assets/shop/icons/login-icon-02.svg'
import RegistrationIcon from '../../../../shared/assets/shop/icons/register-icon-05.svg'
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import useAuthUser from '../../../auth/useAuthUser'

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
                    <>
                        <div className={s.userInfo} onClick={() => {
                            navigate(BikeShopPaths.SHOP.PROFILE)
                        }}>
                            <ProfileAvatar lastName={userLastName} firstName={userFirstName}/>
                            <div>{userLastName} {''} {userFirstName}</div>
                        </div>

                        <div className={s.profileIcon} onClick={() => {
                            navigate(BikeShopPaths.SHOP.PROFILE)
                        }}>
                            <img src={ProfileIcon} alt="profile-logo"/>
                        </div>
                    </>
                    :
                    <>
                        <div className={s.loginBlock}>
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

                        <div className={s.loginBlock_icons}>
                            <div className={s.loginBlock_enter}
                                 onClick={() => {
                                     logout()
                                     navigate(BikeShopPaths.COMMON.LOGIN)
                                 }}
                            >
                                <img src={LoginIcon} alt="login-icon"/>
                            </div>
                            <div className={s.loginBlock_registration}
                                 onClick={() => {
                                     navigate(BikeShopPaths.COMMON.REGISTRATION)
                                 }}
                            >
                                <img src={RegistrationIcon} alt="registration-icon"/>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}