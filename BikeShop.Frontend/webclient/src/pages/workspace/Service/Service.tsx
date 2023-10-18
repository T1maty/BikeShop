import React, {useEffect} from 'react'
import s from './Service.module.scss'
import useService from "./ServiceStore"
import {ServiceForm} from "./ServiceForm"
import {ServiceNavigation} from "./ServiceNavigation"
import {useForm} from "react-hook-form"
import {ServiceFormModel} from "../../../entities"
import {PrintModal} from "../../../features";
import {ActServiceWork, CheckForServiceWork, ServiceIncomeInvoice} from "../../../widgets";
import {ServiceSticker} from "../../../widgets/workspace/Invoices/Service/ServiceSticker";
import {PrintNameEnum} from "../../../entities/enumerables/PrintNameEnum";

export const Service = () => {
    const getMasters = useService(s => s.getMasters)
    const getAllServicesInfo = useService(s => s.getAllServicesInfo)

    const setPrintModalIn = useService(s => s.setPrintModalIn)
    const printModalIn = useService(s => s.printModalIn)
    const setPrintModalSticker = useService(s => s.setPrintModalSticker)
    const printModalSticker = useService(s => s.printModalSticker)

    const printModalOut = useService(s => s.printModalOut)
    const setPrintModalOut = useService(s => s.setPrintModalOut)

    const setPrintModalOutSmall = useService(s => s.setPrintModalOutSmall)
    const printModalOutSmall = useService(s => s.printModalOutSmall)
    const currentService = useService(s => s.currentService)


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

    return (
        <div className={s.serviceBlock} onContextMenu={e => {
            e.preventDefault()
        }}>

            <PrintModal open={printModalIn} id={currentService ? currentService.service.id : 0}
                        setOpen={setPrintModalIn}
                        children={<ServiceIncomeInvoice children={currentService!}/>}
                        printAgentName={PrintNameEnum.AgentPrintServiceIncomeAct} copies={2}
            />
            <PrintModal open={printModalSticker} id={currentService ? currentService.service.id : 0}
                        setOpen={setPrintModalSticker} printAgentName={PrintNameEnum.AgentPrintServiceSticker}
                        children={<ServiceSticker children={currentService!}/>}
            />

            <PrintModal open={printModalOut} id={currentService ? currentService.service.id : 0}
                        printAgentName={PrintNameEnum.AgentPrintServiceOutcomeFullAct}
                        setOpen={setPrintModalOut}
                        children={<CheckForServiceWork children={currentService!}/>}
            />

            <PrintModal open={printModalOutSmall} id={currentService ? currentService.service.id : 0}
                        printAgentName={PrintNameEnum.AgentPrintServiceOutcomeSmallAct}
                        setOpen={setPrintModalOutSmall}
                        children={<ActServiceWork children={currentService!}/>}
            />


            <ServiceNavigation children={formControl}/>
            <ServiceForm children={formControl}/>
        </div>
    )

}