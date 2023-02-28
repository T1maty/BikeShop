import React, {useEffect, useState} from 'react';
import {Modal} from '@mui/material';
import s from './ArchiveModal.module.scss'
import {ServiceItem} from '../../entities';
import useArchiveModal from "./ArchiveModalStore";
import {Button} from "../../shared/ui";
import style from "../../shared/ui/Button/Button.module.scss";

type ArchiveModalStatusType = 'Ended' | 'Canceled' | 'Deleted'

export const ArchiveModal = () => {

    const open = useArchiveModal(s => s.chooseArchiveModal)
    const setOpen = useArchiveModal(s => s.setArchiveModal)
    const isLoading = useArchiveModal(s => s.isLoading)

    const services = useArchiveModal(s => s.services)
    const filteredServices = useArchiveModal(s => s.filteredServices)
    const setFilteredServices = useArchiveModal(s => s.setFilteredServices)
    const currentService = useArchiveModal(s => s.currentService)
    const setCurrentService = useArchiveModal(s => s.setCurrentService)
    const getAllServicesInfo = useArchiveModal(s => s.getAllServicesInfo)

    // стили //
    // для стилей кнопок фильтрации
    const [isActiveEnded, setIsActiveEnded] = useState<boolean>(false)
    const [isActiveCanceled, setIsActiveCanceled] = useState<boolean>(false)
    const [isActiveDeleted, setIsActiveDeleted] = useState<boolean>(false)

    // для стилей выбранного элемента
    const [activeId, setActiveId] = useState<number | null>(null)

    const filterServicesUniversalHandler = (filterName: ArchiveModalStatusType, isButtonEndedOn: boolean,
                                            isButtonCanceledOn: boolean, isButtonDeletedOn: boolean,) => {

        setFilteredServices(services.filter(serv => serv.status === filterName))
        setIsActiveEnded(isButtonEndedOn)
        setIsActiveCanceled(isButtonCanceledOn)
        setIsActiveDeleted(isButtonDeletedOn)
    }

    const chooseServiceItem = (ServiceItemObj: ServiceItem) => {
        // поиск элемента из массива для применения стилей
        const activeElement = filteredServices.find(item => item.id === ServiceItemObj.id)
        activeElement && setActiveId(ServiceItemObj.id)

        // сетаем данные в стор при выборе
        setCurrentService(ServiceItemObj)
    }

    useEffect(() => {
        getAllServicesInfo()
        setIsActiveEnded(true)
    }, [])

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
                <div className={s.archiveModal_mainBox}>
                    <div className={s.archiveModal_title}>Архив ремонтов</div>
                    <div className={s.archiveModal_services}>
                        <div className={s.archiveModal_serviceList}>
                            <div className={s.serviceList_header}>
                                <div>
                                    <Button className={isActiveEnded ? style.ended : ''}
                                            onClick={() => {filterServicesUniversalHandler('Ended',
                                                true, false, false)
                                            }}
                                    >
                                        Завершённые
                                    </Button>
                                </div>
                                <div>
                                    <Button className={isActiveCanceled ? style.canceled : ''}
                                            onClick={() => {filterServicesUniversalHandler('Canceled',
                                                false, true, false)
                                            }}
                                    >
                                        Отменённые
                                    </Button>
                                </div>
                                <div>
                                    <Button className={isActiveDeleted ? style.deleted : ''}
                                            onClick={() => {filterServicesUniversalHandler('Deleted',
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
                                                    <div key={service.id}
                                                        className={service.id === activeId ? s.serviceItem_active : s.serviceItem}
                                                        onClick={() => {chooseServiceItem(service)}}
                                                    >
                                                        {service.name}
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
                                                <div className={s.contentItem_info}>{currentService.name}</div>
                                            </div>
                                            <div className={s.contentItem_box}>
                                                <div className={s.contentItem_title}>Описание:</div>
                                                <div className={s.contentItem_info}>{currentService.clientDescription}</div>
                                            </div>
                                            <div className={s.contentItem_box}>
                                                <div className={s.contentItem_title}>Сумма:</div>
                                                <div className={s.contentItem_info}>{currentService.total}</div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={s.archiveModal_closeBtn}>
                        <Button onClick={() => {setOpen(false)}}>
                            Закрыть
                        </Button>
                    </div>
                </div>

        </Modal>
    );
};