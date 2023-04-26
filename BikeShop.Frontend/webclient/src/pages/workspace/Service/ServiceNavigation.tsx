import React, {useState} from 'react'
import s from "./Service.module.scss"
import {Button} from "../../../shared/ui"
import style from "../../../shared/ui/Button/Button.module.scss"
import useService, {ServiceListStatusType} from "./ServiceStore"
import {ServiceStatusType} from "../../../entities/models/Service/ServiceItem"
import {CreateService, EnumServiceStatus} from "../../../entities"
import {PrintModal} from "../../../features";
import {CheckForServiceWork} from "../../../widgets";
import {UseFormReturn} from "react-hook-form";

export const ServiceNavigation = (props: { children: UseFormReturn<CreateService, any> }) => {

    const isLoading = useService(s => s.isLoading)
    const serviceListStatus = useService(s => s.serviceListStatus)
    const setServiceListStatus = useService(s => s.setServiceListStatus)
    const services = useService(s => s.services)
    const currentService = useService(s => s.currentService)
    const setCurrentService = useService(s => s.setCurrentService)
    const filteredServices = useService(s => s.filteredServices)
    const setFilteredServices = useService(s => s.setFilteredServices)
    const updateServiceStatus = useService(s => s.updateServiceStatus)

    const [openPrint, setOpenPrint] = useState(false);

    const filterServicesUniversalHandler = (filterName: ServiceListStatusType, isButtonWaitingOn: boolean,
                                            isButtonInProcessOn: boolean, isButtonReadyOn: boolean,
                                            extraFilterName?: ServiceStatusType) => {

        setFilteredServices(services.filter(serv => serv.status === filterName || serv.status === extraFilterName))

        isButtonWaitingOn ? setServiceListStatus(EnumServiceStatus.Waiting) : true
        isButtonInProcessOn ? setServiceListStatus(EnumServiceStatus.InProcess) : true
        isButtonReadyOn ? setServiceListStatus(EnumServiceStatus.Ready) : true
        console.log('отфильтрованные сервисы', filteredServices)
    }

    const updateServiceStatusHandler = (newStatus: ServiceStatusType) => {
        if (newStatus === "Ended") {

        }
        updateServiceStatus({id: currentService?.id || -1, status: newStatus}, () => {
            setOpenPrint(true)
        })
    }

    return (
        <div className={s.service_leftSide}>

            <PrintModal open={openPrint} setOpen={setOpenPrint}
                        children={<CheckForServiceWork children={currentService!}/>}/>

            <div className={s.leftSide_buttons}>
                <div className={s.buttons_filter}>
                    <Button
                        className={(serviceListStatus === EnumServiceStatus.Waiting ||
                            serviceListStatus === EnumServiceStatus.WaitingSupply) ? style.waiting : ''}
                        onClick={() => {
                            filterServicesUniversalHandler('Waiting',
                                true, false, false,
                                'WaitingSupply')
                        }}
                    >
                        Ожидают
                    </Button>
                    <Button className={serviceListStatus === EnumServiceStatus.InProcess ? style.process : ''}
                            onClick={() => {
                                filterServicesUniversalHandler('InProcess',
                                    false, true, false)
                            }}
                    >
                        В ремонте
                    </Button>
                    <Button className={serviceListStatus === EnumServiceStatus.Ready ? style.ready : ''}
                            onClick={() => {
                                filterServicesUniversalHandler('Ready',
                                    false, false, true)
                            }}
                    >
                        Готово
                    </Button>
                </div>
                <div className={s.content_title}>
                    {
                        (serviceListStatus === EnumServiceStatus.Waiting
                            || serviceListStatus === EnumServiceStatus.WaitingSupply) &&
                        <Button buttonDivWrapper={s.content_startBtn}
                                disabled={currentService === null || props.children.formState.isDirty}
                                onClick={() => {
                                    updateServiceStatusHandler('InProcess')
                                }}>
                            Начать ремонт
                        </Button>
                    }
                    {
                        serviceListStatus === EnumServiceStatus.InProcess &&
                        <div className={s.content_inProcessButtons}>
                            <Button disabled={currentService === null || props.children.formState.isDirty}
                                    onClick={() => {
                                        updateServiceStatusHandler('WaitingSupply')
                                    }}>
                                Остановить ремонт
                            </Button>
                            <Button disabled={currentService === null || props.children.formState.isDirty}
                                    onClick={() => {
                                        updateServiceStatusHandler('Ready')
                                    }}>
                                Закончить ремонт
                            </Button>
                        </div>
                    }

                    {
                        serviceListStatus === EnumServiceStatus.Ready &&
                        <div className={s.content_doneButtons}>
                            <Button disabled={currentService === null || props.children.formState.isDirty}
                                    onClick={() => {
                                        updateServiceStatusHandler('InProcess')
                                    }}>
                                Продолжить ремонт
                            </Button>
                            <Button disabled={currentService === null || props.children.formState.isDirty}
                                    onClick={() => {
                                        updateServiceStatusHandler('Ended')
                                    }}>
                                Выдать велосипед
                            </Button>
                        </div>
                    }
                </div>
            </div>
            <div className={s.leftSide_content}>
                <div className={s.content_info}>
                    {
                        isLoading ? <div>Загрузка...</div> :

                            filteredServices.length === 0 ? <div>Список пуст</div> :

                                filteredServices.map(service => {
                                    return (
                                        <div key={service.id}
                                            // className={service.id === activeId ? s.serviceItem_active : s.serviceItem}
                                             className={service.id === currentService?.id ? s.serviceItem_active :
                                                 service.status === 'WaitingSupply' ? s.serviceItem_WaitingSupply : s.serviceItem}
                                             onClick={() => {
                                                 setCurrentService(service)
                                             }}
                                        >
                                            {service.name}
                                        </div>
                                    )
                                })
                    }
                </div>
            </div>
        </div>
    )
}