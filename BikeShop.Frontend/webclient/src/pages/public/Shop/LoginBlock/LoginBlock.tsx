import React from 'react'
import s from './LoginBlock.module.scss'
import {ProfileAvatar} from '../Profile/ProfileAvatar'
import ProfileIcon from '../../../../shared/assets/shop/icons/profile-icon-02.svg'
import LoginIcon from '../../../../shared/assets/shop/icons/login-icon-02.svg'
import LogoutIcon from '../../../../shared/assets/shop/icons/logout-icon.svg'
import RegistrationIcon from '../../../../shared/assets/shop/icons/register-icon-05.svg'
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import {useAuth} from "../../../../entities"

interface LoginBlockProps {
    isAuth: boolean
    userLastName: string
    userFirstName: string
}

export const LoginBlock: React.FC<LoginBlockProps> = ({isAuth, userLastName, userFirstName}) => {

    const navigate = useNavigate()
    const logout = useAuth(s => s.logout)

    return (
        <div className={s.loginBlock_mainBox}>
            {
                isAuth ?
                    <>
                        <div className={s.userInfo}
                             onClick={() => {navigate(BikeShopPaths.SHOP.PROFILE)}}
                        >
                            <ProfileAvatar lastName={userLastName} firstName={userFirstName}/>
                            <div className={s.userName}>
                                {userLastName} {''} {userFirstName}
                            </div>
                            <div className={s.logout} onClick={logout}>
                                <img src={LogoutIcon} alt="logout-icon"/>
                            </div>
                        </div>

                        <div className={s.profileIconsBlock}
                             onClick={() => {navigate(BikeShopPaths.SHOP.PROFILE)}}
                        >
                            <div className={s.profile}>
                                <img src={ProfileIcon} alt="profile-logo"/>
                            </div>
                            <div className={s.logout} onClick={logout}>
                                <img src={LogoutIcon} alt="logout-icon"/>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className={s.loginBlock}>
                            <div className={s.loginBlock_enter}
                                 onClick={() => {
                                     logout().then()
                                     navigate(BikeShopPaths.COMMON.LOGIN)
                                 }}
                            >
                                Вход
                            </div>
                            <div className={s.loginBlock_registration}
                                 onClick={() => {navigate(BikeShopPaths.COMMON.REGISTRATION)}}
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
                                 onClick={() => {navigate(BikeShopPaths.COMMON.REGISTRATION)}}
                            >
                                <img src={RegistrationIcon} alt="registration-icon"/>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}