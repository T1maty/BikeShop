import React, {useState} from 'react'
import s from "./Service.module.scss"
import {Button} from "../../../shared/ui"
import style from "../../../shared/ui/Button/Button.module.scss"
import useService from "./ServiceStore"
import ServiceStore, {ServiceListStatusType} from "./ServiceStore"
import {
    AuthAPI,
    EnumServiceStatus,
    PaymentData,
    ServiceFormModel,
    ServiceStatus,
    ServiceWithData,
    User
} from "../../../entities"
import {ConfirmModal, PayModal, PrintModal} from "../../../features"
import {ActServiceWork, CheckForServiceWork} from "../../../widgets"
import {UseFormReturn} from "react-hook-form"
import {ServiceNavigationContext} from "./ServiceNavigationContex"
import {formatDateNoYear} from "../../../shared/utils/formatDateNoYear"

export const ServiceNavigation = (props: { children: UseFormReturn<ServiceFormModel, any> }) => {

    const isLoading = useService(s => s.isLoading)
    const setIsLoading = useService(s => s.setIsLoading)
    const serviceListStatus = useService(s => s.serviceListStatus)
    const setServiceListStatus = useService(s => s.setServiceListStatus)
    const services = useService(s => s.services)
    const currentService = useService(s => s.currentService)
    const setCurrentService = useService(s => s.setCurrentService)
    const filteredServices = useService(s => s.filteredServices)
    const setFilteredServices = useService(s => s.setFilteredServices)
    const updateServiceStatus = useService(s => s.updateServiceStatus)
    const printModal = useService(s => s.printModalOut)
    const setPrintModal = useService(s => s.setPrintModalOut)
    const trigger = useService(s => s.triggerOut)
    const setTrigger = useService(s => s.setTriggerOut)
    const setIsPrinting = useService(s => s.setIsPrinting)
    const setPrintModalOutSmall = useService(s => s.setPrintModalOutSmall)
    const setTriggerOutSmall = useService(s => s.setTriggerOutSmall)
    const printModalOutSmall = useService(s => s.printModalOutSmall)

    const triggerOutSmall = useService(s => s.triggerOutSmall)


    const endService = useService(s => s.endService)
    const setIsCreating = useService(s => s.setIsCreating)

    const [confirm, setConfirm] = useState(false);
    const [payModal, setPayModal] = useState(false);
    const [paymentUser, setPaymentUser] = useState<User | null>(null);
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
        })
    }

    const updateServiceStatusHandlerEnded = (r: PaymentData) => {
        endService(currentService?.service.id || -1, r, () => {
        })
    }

    return (
        <div className={s.service_leftSide}>
            <PayModal open={payModal} setOpen={setPayModal} user={paymentUser}
                      summ={currentService ? currentService?.service.total : 0}
                      result={(r, ip) => {
                          console.log(r)
                          setIsPrinting(ip)
                          updateServiceStatusHandlerEnded(r)
                          setPayModal(false)
                      }}/>


            <PrintModal open={printModal} trigger={trigger} printAgentName={'WorkshopOut'} finaly={() => {
                setPrintModal(false)
                setTrigger(null)
                setPrintModalOutSmall(true)
                setTriggerOutSmall('agent')
            }}
                        setOpen={setPrintModal}
                        children={<CheckForServiceWork children={currentService!}/>}
            />

            <PrintModal open={printModalOutSmall} trigger={triggerOutSmall} printAgentName={'WorkshopOutSmall'}
                        finaly={() => {
                            setPrintModalOutSmall(false)
                            setTriggerOutSmall(null)
                        }}
                        setOpen={setPrintModalOutSmall}
                        children={<ActServiceWork children={currentService!}/>}
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
                                    filterServicesUniversalHandler('InProcess',
                                        false, true, false)
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
                                        filterServicesUniversalHandler('Waiting',
                                            true, false, false,
                                            'WaitingSupply')
                                    }}>
                                Остановить ремонт
                            </Button>
                            <Button disabled={currentService === null || props.children.formState.isDirty}
                                    onClick={() => {
                                        updateServiceStatusHandler('Ready')
                                        filterServicesUniversalHandler('Ready',
                                            false, false, true)
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
                                        filterServicesUniversalHandler('InProcess',
                                            false, true, false)
                                    }}>
                                Продолжить ремонт
                            </Button>
                            <Button disabled={currentService === null || props.children.formState.isDirty}
                                    onClick={() => {
                                        setPayModal(true)
                                        AuthAPI.User.getUserById(currentService!.service.clientId).then(r => {
                                            setPaymentUser(r.data)
                                        }).catch(() => {
                                            setPaymentUser(null)
                                        })
                                    }}>
                                Видати велосипед
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