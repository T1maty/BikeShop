import React from 'react';
import s from "./Service.module.scss";
import {Button} from "../../../shared/ui";
import style from "../../../shared/ui/Button/Button.module.scss";
import useService, {ServiceListStatusType} from "./ServiceStore";
import {ServiceStatusType} from "../../../entities/models/ServiceItem";
import {EnumServiceStatus} from "../../../entities";

const ServiceNavigation = () => {

    const currentService = useService(s => s.currentService)
    const isLoading = useService(s => s.isLoading)
    const services = useService(s => s.services)
    const filteredServices = useService(s => s.filteredServices)
    const setFilteredServices = useService(s => s.setFilteredServices)
    const chooseServiceItem = useService(s => s.setCurrentService)
    const updateServiceStatus = useService(s => s.updateServiceStatus)
    const mode = useService(s => s.mode)
    const setMode = useService(s => s.setMode)

    const filterServicesUniversalHandler = (filterName: ServiceListStatusType, isButtonWaitingOn: boolean,
                                            isButtonInProcessOn: boolean, isButtonReadyOn: boolean,
                                            extraFilterName?: ServiceStatusType) => {

        setFilteredServices(services.filter(serv => serv.status === filterName || serv.status === extraFilterName))

        isButtonWaitingOn ? setMode(EnumServiceStatus.Waiting) : true
        isButtonInProcessOn ? setMode(EnumServiceStatus.InProcess) : true
        isButtonReadyOn ? setMode(EnumServiceStatus.Ready) : true
        console.log('отфильтрованные сервисы', filteredServices)
    }


    const updateServiceStatusHandler = (newStatus: ServiceStatusType) => {
        updateServiceStatus({id: currentService?.id || -1, status: newStatus})
    }

    return (
        <div className={s.service_leftSide}>
            <div className={s.leftSide_buttons}>
                <div className={s.buttons_filter}>
                    <div>
                        <Button
                            className={(EnumServiceStatus.Waiting === mode || EnumServiceStatus.WaitingSupply === mode) ? style.waiting : ''}
                            onClick={() => {
                                filterServicesUniversalHandler('Waiting',
                                    true, false, false,
                                    'WaitingSupply')
                            }}
                        >
                            Ожидают
                        </Button>
                    </div>
                    <div>
                        <Button className={mode === EnumServiceStatus.InProcess ? style.process : ''}
                                onClick={() => {
                                    filterServicesUniversalHandler('InProcess',
                                        false, true, false)
                                }}
                        >
                            В ремонте
                        </Button>
                    </div>
                    <div>
                        <Button className={mode === EnumServiceStatus.Ready ? style.ready : ''}
                                onClick={() => {
                                    filterServicesUniversalHandler('Ready',
                                        false, false, true)
                                }}
                        >
                            Готово
                        </Button>
                    </div>
                </div>
                <div className={s.content_title}>
                    {
                        (EnumServiceStatus.Waiting === mode || EnumServiceStatus.WaitingSupply === mode) &&
                        <div className={s.content_startBtn}>
                            <Button disabled={currentService === null}
                                    onClick={() => {
                                        updateServiceStatusHandler('InProcess')
                                    }}>
                                Начать ремонт
                            </Button>
                        </div>
                    }
                    {
                        mode === EnumServiceStatus.InProcess &&
                        <div className={s.content_inProcessButtons}>
                            <Button disabled={currentService === null}
                                    onClick={() => {
                                        updateServiceStatusHandler('WaitingSupply')
                                    }}>
                                Остановить ремонт
                            </Button>
                            <Button disabled={currentService === null}
                                    onClick={() => {
                                        updateServiceStatusHandler('Ready')
                                    }}>
                                Закончить ремонт
                            </Button>
                        </div>
                    }

                    {
                        mode === EnumServiceStatus.Ready &&
                        <div className={s.content_doneButtons}>
                            <Button disabled={currentService === null}
                                    onClick={() => {
                                        updateServiceStatusHandler('InProcess')
                                    }}>
                                Продолжить ремонт
                            </Button>
                            <Button disabled={currentService === null}
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
                                                 chooseServiceItem(service)
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
    );
};

export default ServiceNavigation;