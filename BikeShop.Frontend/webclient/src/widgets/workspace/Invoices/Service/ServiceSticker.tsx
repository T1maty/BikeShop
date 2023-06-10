import React, {useState} from 'react'
import {AuthAPI, ServiceWithData, User} from "../../../../entities"
import s from './ServiceSticker.module.scss'

export const ServiceSticker = (props: { children: ServiceWithData }) => {
    const [client, setClient] = useState<User>({} as User)

    AuthAPI.User.getUserById(props.children.service.clientId).then(r => {
        setClient(r.data)
    })
    return (
        <div className={s.wrapper}>
            {client != null ?
                <>
                    <div>№ {props.children.service.id}</div>
                    <div>{client.firstName} {client!.lastName} {client!.patronymic}</div>
                    <div>{client!.phoneNumber}</div>
                </>
                : <></>
            }

        </div>
    )
}