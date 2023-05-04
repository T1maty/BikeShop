import React from 'react'
import {User} from "../../../entities"

interface StuffProfileInfoProps {
    user: User
}

export const StuffProfileInfo: React.FC<StuffProfileInfoProps> = ({user}) => {
    return (
        <div>
            Персональная информация
        </div>
    )
}