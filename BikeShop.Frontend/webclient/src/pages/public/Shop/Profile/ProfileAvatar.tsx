import React from 'react'

type ProfileAvatarProps = {
    lastName: string
    firstName: string
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({lastName, firstName}) => {

    const generateAvatarName = (lastName: string, firstName: string) => {
        return (lastName[0] + firstName[0]).toUpperCase()
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
        <div style={avatarStyles}>
            {generateAvatarName(lastName, firstName)}
        </div>
    )
}