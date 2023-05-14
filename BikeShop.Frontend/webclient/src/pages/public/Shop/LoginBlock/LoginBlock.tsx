import React from 'react'
import s from './LoginBlock.module.scss'
import {ProfileAvatar} from '../Profile/ProfileAvatar'
import ProfileIcon from '../../../../shared/assets/shop/icons/profile-icon-02.svg'
import LoginIcon from '../../../../shared/assets/shop/icons/login-icon-02.svg'
import LogoutIcon from '../../../../shared/assets/shop/icons/logout-icon.svg'
import RegistrationIcon from '../../../../shared/assets/shop/icons/register-icon-05.svg'
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'
import {useAuth, User} from '../../../../entities'

interface LoginBlockProps {
    isAuth: boolean
    user: User | undefined
}

export const LoginBlock: React.FC<LoginBlockProps> = ({isAuth, user}) => {

    const navigate = useNavigate()
    const logout = useAuth(s => s.logout)

    return (
        <div className={s.loginBlock_mainBox}>
            {
                isAuth && user !== undefined ?
                    <>
                        <div className={s.userInfo}>
                            <ProfileAvatar user={user}/>
                            <div className={s.userName} onClick={() => {navigate(BikeShopPaths.SHOP.PROFILE)}}>
                                {user.lastName ? user.lastName : 'Ваше'} {user.firstName ? user.firstName : 'Имя'}
                            </div>
                            <div className={s.logout}
                                 onClick={() => {
                                    logout().then()
                                    navigate(BikeShopPaths.SHOP.HOME)
                                 }}
                            >
                                <img src={LogoutIcon} alt="logout-icon"/>
                            </div>
                        </div>

                        <div className={s.profileIconsBlock}
                             onClick={() => {navigate(BikeShopPaths.SHOP.PROFILE)}}
                        >
                            <div className={s.profile}>
                                <img src={ProfileIcon} alt="profile-logo"/>
                            </div>
                            <div className={s.logout}
                                 onClick={() => {
                                     logout().then()
                                     navigate(BikeShopPaths.SHOP.HOME)
                                 }}
                            >
                                <img src={LogoutIcon} alt="logout-icon"/>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className={s.loginBlock}>
                            <div className={s.loginBlock_enter}
                                 onClick={() => {navigate(BikeShopPaths.COMMON.LOGIN)}}
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
                                 onClick={() => {navigate(BikeShopPaths.COMMON.LOGIN)}}
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