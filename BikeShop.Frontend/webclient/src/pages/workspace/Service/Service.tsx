import React from 'react'
import s from './Service.module.scss'
import ServiceNavigation from "./ServiceNavigation";
import ServiceForm from "./ServiceForm";
import useService from "./ServiceStore";

const Service = () => {

    const getMasters = useService(s => s.getMasters)
    const getAllServicesInfo = useService(s => s.getAllServicesInfo)

    React.useEffect(() => {
        getMasters()
        getAllServicesInfo()
    }, [])

    return (
        <div className={s.serviceBlock}>
            <ServiceNavigation/>
            <ServiceForm/>
        </div>
    );
};
export default Service;
