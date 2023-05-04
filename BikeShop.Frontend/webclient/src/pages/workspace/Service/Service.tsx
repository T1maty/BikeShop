import React, {useEffect} from 'react'
import s from './Service.module.scss'
import useService from "./ServiceStore"
import {LoaderScreen} from "../../../shared/ui"
import {ServiceForm} from "./ServiceForm"
import {ServiceNavigation} from "./ServiceNavigation"
import {useSnackbar} from 'notistack'
import {useForm} from "react-hook-form"
import {ServiceFormModel} from "../../../entities"

export const Service = () => {

    const {enqueueSnackbar} = useSnackbar()

    const isLoading = useService(s => s.isLoading)
    const errorStatus = useService(s => s.errorStatus)
    const getMasters = useService(s => s.getMasters)
    const getAllServicesInfo = useService(s => s.getAllServicesInfo)

    const formControl = useForm<ServiceFormModel>({
        defaultValues: {
            serviceProducts: [],
            serviceWorks: [],
            id: 0,
            name: '',
            clientDescription: '',
            userMasterDescription: '',
            userCreatedDescription: '',
            userId: '',
            userMasterId: '',
            workDiscountId: 0,
            productDiscountId: 0,
            shopId: 0,
            clientId: '',
        }
    })

    useEffect(() => {
        getMasters()
        getAllServicesInfo()
    }, [])

    useEffect(() => {
        if (errorStatus === 'success') {
            enqueueSnackbar('Операция выполнена', {variant: 'success', autoHideDuration: 3000})
        }
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <div className={s.serviceBlock} onContextMenu={e => {e.preventDefault()}}>
                <ServiceNavigation children={formControl}/>
                <ServiceForm children={formControl}/>
            </div>
        )
    }
}