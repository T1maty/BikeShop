import React from 'react'
import {ServiceWithData} from "../../../entities"

export const ServiceSticker = (props: { children: ServiceWithData }) => {
    return (
        <div>
            <div>{props.children.service.id}</div>
            <div>{props.children.service.clientId}</div>
        </div>
    )
}