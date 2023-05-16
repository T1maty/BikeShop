import React, {useState} from 'react'
import s from "./Service.module.scss"
import {Button} from "../../../shared/ui"
import style from "../../../shared/ui/Button/Button.module.scss"
import useService from "./ServiceStore"
import ServiceStore, {ServiceListStatusType} from "./ServiceStore"
import {EnumServiceStatus, ServiceFormModel, ServiceStatus, ServiceWithData} from "../../../entities"
import {ConfirmModal, PrintModal} from "../../../features"
import {CheckForServiceWork} from "../../../widgets"
import {UseFormReturn} from "react-hook-form"
import {ServiceNavigationContext} from "./ServiceNavigationContex"
import {formatDateNoYear} from "../../../shared/utils/formatDateNoYear"

export const ServiceNavigation = (props: { children: UseFormReturn<ServiceFormModel, any> }) => {

    const isLoading = useService(s => s.isLoading)
    const serviceListStatus = useService(s => s.serviceListStatus)
    const setServiceListStatus = useService(s => s.setServiceListStatus)
    const services = useService(s => s.services)
    const currentService = useService(s => s.currentService)
    const setCurrentService = useService(s => s.setCurrentService)
    const filteredServices = useService(s => s.filteredServices)
    const setFilteredServices = useService(s => s.setFilteredServices)
    const updateServiceStatus = useService(s => s.updateServiceStatus)
    const printModal = useService(s => s.printModal)
    const setPrintModal = useService(s => s.setPrintModal)

    const [confirm, setConfirm] = useState(false);
    const [confData, setConfData] = useState<ServiceWithData>()
    const [navContext, setNavContext] = useState<{ o: boolean, x: number, y: number }>({o: false, x: 0, y: 0})

    const selected = ServiceStore(s => s.selectedNavService)
    const setSelected = ServiceStore(s => s.setSelectedNavService)

    const itemStyles = {
        backgroundColor: '#efefef',
        color: 'black',
        padding: '5px',
        borderRadius: '5px'
    }

    const filterServicesUniversalHandler = (filterName: ServiceListStatusType, isButtonWaitingOn: boolean,
                                            isButtonInProcessOn: boolean, isButtonReadyOn: boolean,
                                            extraFilterName?: ServiceStatus) => {

        setFilteredServices(services.filter(serv => serv.service.status === filterName || serv.service.status === extraFilterName))

        isButtonWaitingOn ? setServiceListStatus(EnumServiceStatus.Waiting) : true
        isButtonInProcessOn ? setServiceListStatus(EnumServiceStatus.InProcess) : true
        isButtonReadyOn ? setServiceListStatus(EnumServiceStatus.Ready) : true
        console.log('отфильтрованные сервисы', filteredServices)
    }

    const updateServiceStatusHandler = (newStatus: ServiceStatus) => {
        updateServiceStatus({id: currentService?.service.id || -1, status: newStatus}, () => {
            if (newStatus === "Ended") {
                console.log('statusChanged')
                setPrintModal(true)
            }
        })
    }

    return (
        <div className={s.service_leftSide}>
            <PrintModal open={printModal}
                        setOpen={setPrintModal}
                        children={<CheckForServiceWork children={currentService!}/>}
            />
            <ServiceNavigationContext open={navContext} setOpen={setNavContext}/>
            <ConfirmModal title={'Несохраненные изменения будут утеряны'}
                          extraCallback={() => {
                              setCurrentService(confData!)
                              setSelected(confData!)
                          }}
                          open={confirm}
                          setOpen={setConfirm}
            />


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
                                        <div key={service.service.id}
                                             className={service.service.id === currentService?.service.id ? s.serviceItem_active :
                                                 service.service.status === 'WaitingSupply' ? s.serviceItem_WaitingSupply :
                                                     selected?.service.id === service.service.id ? s.serviceItem_selected : s.serviceItem}
                                             onClick={() => {
                                                 if (props.children.formState.isDirty) {
                                                     setConfirm(true)
                                                     setConfData(service)
                                                 } else {
                                                     setCurrentService(service)
                                                     setSelected(service)
                                                 }
                                             }}
                                             onContextMenu={(e) => {
                                                 setSelected(service)
                                                 setNavContext({o: true, x: e.clientX, y: e.clientY})
                                             }}
                                        >
                                            <div style={itemStyles}>{service.service.id}</div>
                                            <div>{service.service.name}</div>
                                            <div style={itemStyles}>{formatDateNoYear(service.service.createdAt)}</div>
                                        </div>
                                    )
                                })
                    }
                </div>
            </div>
        </div>
    )
}