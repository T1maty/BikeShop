import React from 'react'
import s from './ProfileAvatar.module.scss'
import {User} from '../../../../entities'
import {BikeShopPaths} from '../../../../app/routes/paths'
import {useNavigate} from 'react-router-dom'

type ProfileAvatarProps = {
    user: User
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({user}) => {

    const navigate = useNavigate()

    const generateAvatarName = (lastName: string, firstName: string) => {
        if (lastName !== null && firstName !== null) {
            return (lastName[0] + firstName[0]).toUpperCase()
        } else {
            return 'BS'
        }
    }

    const avatarStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: '50%',
        minWidth: '50px',
        height: '50px',
    }

    return (
        <div className={s.avatar} onClick={() => {navigate(BikeShopPaths.SHOP.PROFILE)}}>
            {generateAvatarName(user.lastName, user.firstName)}
        </div>
    )
}