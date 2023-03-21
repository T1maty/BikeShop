import React, {useEffect} from 'react'
import s from './Service.module.scss'
import ServiceNavigation from "./ServiceNavigation"
import ServiceForm from "./ServiceForm"
import useService from "./ServiceStore"

export const Service = () => {

    const getMasters = useService(s => s.getMasters)
    const getAllServicesInfo = useService(s => s.getAllServicesInfo)

    useEffect(() => {
        getMasters()
        getAllServicesInfo()
    }, [])

    return (
        <div className={s.serviceBlock}>
            <ServiceNavigation/>
            <ServiceForm/>
        </div>
    )
}