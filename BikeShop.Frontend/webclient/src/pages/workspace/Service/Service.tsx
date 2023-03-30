import React, {useEffect} from 'react'
import s from './Service.module.scss'
import useService from "./ServiceStore"
import {LoaderScreen} from "../../../shared/ui"
import {ServiceForm} from "./ServiceForm"
import {ServiceNavigation} from "./ServiceNavigation"

export const Service = () => {

    const isLoading = useService(s => s.isLoading)
    const getMasters = useService(s => s.getMasters)
    const getAllServicesInfo = useService(s => s.getAllServicesInfo)

    useEffect(() => {
        getMasters()
        getAllServicesInfo()
    }, [])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <div className={s.serviceBlock}>
                <ServiceNavigation/>
                <ServiceForm/>
            </div>
        )
    }
}