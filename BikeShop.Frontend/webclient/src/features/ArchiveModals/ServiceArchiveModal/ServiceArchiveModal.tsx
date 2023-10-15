import React, {useEffect, useState} from 'react'
import s from './ServiceArchiveModal.module.scss'
import {ServiceWithData} from '../../../entities'
import useServiceArchiveModal from "./ServiceArchiveModalStore"
import {Button, CustomModal} from "../../../shared/ui"
import style from "../../../shared/ui/Button/Button.module.scss"
import {PrintModal} from "../../PrintModal/PrintModal";
import {CheckForServiceWork} from "../../../widgets";
import {PrintNameEnum} from "../../../entities/enumerables/PrintNameEnum";

type ServiceArchiveModalStatusType = 'Ended' | 'Canceled' | 'Deleted'

export const ServiceArchiveModal = () => {

    const open = useServiceArchiveModal(s => s.openServiceArchiveModal)
    const setOpen = useServiceArchiveModal(s => s.setOpenServiceArchiveModal)
    const isLoading = useServiceArchiveModal(s => s.isLoading)

    const services = useServiceArchiveModal(s => s.services)
    const filteredServices = useServiceArchiveModal(s => s.filteredServices)
    const setFilteredServices = useServiceArchiveModal(s => s.setFilteredServices)
    const currentService = useServiceArchiveModal(s => s.currentService)
    const setCurrentService = useServiceArchiveModal(s => s.setCurrentService)
    const getAllServicesInfo = useServiceArchiveModal(s => s.getAllServicesInfo)

    // стили //
    // для стилей кнопок фильтрации
    const [isActiveEnded, setIsActiveEnded] = useState<boolean>(false)
    const [isActiveCanceled, setIsActiveCanceled] = useState<boolean>(false)
    const [isActiveDeleted, setIsActiveDeleted] = useState<boolean>(false)

    const [v4, sv4] = useState(false)

    // для стилей выбранного элемента
    const [activeId, setActiveId] = useState<number | null>(null)

    const filterServicesUniversalHandler = (filterName: ServiceArchiveModalStatusType, isButtonEndedOn: boolean,
                                            isButtonCanceledOn: boolean, isButtonDeletedOn: boolean,) => {

        setFilteredServices(services.filter(serv => serv.service.status === filterName))
        setIsActiveEnded(isButtonEndedOn)
        setIsActiveCanceled(isButtonCanceledOn)
        setIsActiveDeleted(isButtonDeletedOn)
    }

    const chooseServiceItem = (ServiceItemObj: ServiceWithData) => {
        // поиск элемента из массива для применения стилей
        const activeElement = filteredServices.find(item => item.service.id === ServiceItemObj.service.id)
        activeElement && setActiveId(ServiceItemObj.service.id)

        // сетаем данные в стор при выборе
        setCurrentService(ServiceItemObj)
    }

    useEffect(() => {
        open ? getAllServicesInfo() : false
        setIsActiveEnded(true)
    }, [open])

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div className={s.archiveModal_mainBox}>

                <PrintModal open={v4} setOpen={sv4} children={<CheckForServiceWork children={currentService!}/>}
                            printAgentName={PrintNameEnum.AgentPrintServiceOutcomeFullAct}
                            id={currentService!.service.id}/>

                <div className={s.archiveModal_title}>Архив ремонтов</div>
                <div className={s.archiveModal_services}>
                    <div className={s.archiveModal_serviceList}>
                        <div className={s.serviceList_header}>
                            <div>
                                <Button className={isActiveEnded ? style.ended : ''}
                                        onClick={() => {
                                            filterServicesUniversalHandler('Ended',
                                                true, false, false)
                                        }}
                                >
                                    Завершённые
                                </Button>
                            </div>
                            <div>
                                <Button className={isActiveCanceled ? style.canceled : ''}
                                        onClick={() => {
                                            filterServicesUniversalHandler('Canceled',
                                                false, true, false)
                                        }}
                                >
                                    Отменённые
                                </Button>
                            </div>
                            <div>
                                <Button className={isActiveDeleted ? style.deleted : ''}
                                        onClick={() => {
                                            filterServicesUniversalHandler('Deleted',
                                                false, false, true)
                                        }}
                                >
                                    Удалённые
                                </Button>
                            </div>
                        </div>
                        <div className={s.serviceList_content}>
                            {
                                isLoading ? <div>Загрузка...</div> :

                                    filteredServices.length === 0 ? <div>Список пуст</div> :

                                        filteredServices.map(service => {
                                            return (
                                                <div key={service.service.id}
                                                     className={service.service.id === activeId ? s.serviceItem_active : s.serviceItem}
                                                     onClick={() => {
                                                         chooseServiceItem(service)
                                                     }}
                                                     onDoubleClick={() => {
                                                         sv4(true)
                                                     }}
                                                >
                                                    {service.service.name}
                                                </div>
                                            )
                                        })
                            }
                        </div>
                    </div>
                    <div className={s.archiveModal_serviceInfo}>
                        <div className={s.serviceInfo_header}>
                            Информация о сервисе:
                        </div>
                        <div className={s.serviceInfo_content}>
                            {
                                currentService === null ? <div>Выберите сервис</div> :
                                    <div className={s.contentItem}>
                                        <div className={s.contentItem_box}>
                                            <div className={s.contentItem_title}>Техника:</div>
                                            <div className={s.contentItem_info}>{currentService.service.name}</div>
                                        </div>
                                        <div className={s.contentItem_box}>
                                            <div className={s.contentItem_title}>Описание:</div>
                                            <div
                                                className={s.contentItem_info}>{currentService.service.clientDescription}</div>
                                        </div>
                                        <div className={s.contentItem_box}>
                                            <div className={s.contentItem_title}>Сумма:</div>
                                            <div className={s.contentItem_info}>{currentService.service.total}</div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={s.archiveModal_closeBtn}>
                    <Button onClick={() => {
                        setOpen(false)
                    }}>
                        Закрыть
                    </Button>
                </div>
            </div>
        </CustomModal>
    )
}