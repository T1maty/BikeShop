import React from 'react'
import {ServiceWithData} from "../../../../entities"
import s from './ServiceSticker.module.scss'

export const ServiceSticker = (props: { children: ServiceWithData }) => {

    return (
        <div className={s.wrapper}>

            <div>№ {props.children.service.id}</div>
            <div>{props.children.service.clientFIO}</div>
            <div>{props.children.service.clientPhone}</div>

        </div>
    )
}