import React, {useEffect, useState, ChangeEvent} from 'react';
import s from './Service.module.scss'
import style from '../../../shared/ui/Button/Button.module.scss'
import {ChooseClientModal} from '../../../features';
import {Button, ControlledInput} from '../../../shared/ui';
import {ServiceTable} from '../../index';
import useChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModalStore';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useSnackbar} from 'notistack';
import useService from './ServiceStore';
import {Errors} from '../../../entities/errors/workspaceErrors';
import {ClientCard} from '../../../widgets';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import {CreateService, IUser, ServiceItem} from '../../../entities';

export type ServiceStatusType =
    'Waiting' |
    'InProcess' |
    'WaitingSupply' |
    'Ready' |
    'Ended' |
    'Canceled' |
    'Deleted';

enum ServiceStatus {
    Waiting = 0, // ожидают
    InProcess = 1, // в ремонте
    WaitingSupply = 2, // ждёт поставки
    Ready = 3, // готово
    Ended = 4, // выдать велосипед
    Canceled = 5, // отменен
    Deleted = 6 // удален
}

const Service = () => {

    const {enqueueSnackbar} = useSnackbar()
    const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)
    const isLoading = useService(s => s.isLoading)
    const isClientChosen = useChooseClientModal(s => s.isClientChosen)
    const setIsClientChosen = useChooseClientModal(s => s.setIsClientChosen)

    const user = useService(s => s.user)
    const setUser = useService(s => s.setUser)

    const service = useService(s => s.service)
    const setService = useService(s => s.setService)
    const services = useService(s => s.services)
    const getAllServices = useService(s => s.getAllServices)
    const addNewService = useService(s => s.addNewService)
    const getWaitingFilteredServices = useService(s => s.getWaitingFilteredServices)
    const filteredServices = useService(s => s.filteredServices)
    const setFilteredServices = useService(s => s.setFilteredServices)
    const updateService = useService(s => s.updateService)
    const updateServiceStatus = useService(s => s.updateServiceStatus)

    // для стилей кнопок фильтрации
    // const [isFilterActive, setIsFilterActive] = useState<boolean[]>([false, false, false])
    // пример №1
    // const checkHandler = (index) => {
    //     setCheckBoxState(prevState => prevState.map((item, idx) => idx === index ? !item : item))
    // };

    // пример №2
    // const [arr, setValue] = useState(['Тише', 'мыши', 'кот', 'на', 'крыше']);
    // let copy = Object.assign([], arr);
    // let index = 2;
    // copy[index] = 'котята';
    // setValue(copy); // результат: ['Тише', 'мыши', 'котята', 'на', 'крыше']

    // const [isFilterActive, setIsFilterActive] = useState<any[]>([
    //     {title: 'isActiveWaiting', value: false},
    //     {title: 'isActiveProcess', value: false},
    //     {title: 'isActiveEnded', value: false},
    // ])

    const [isActiveWaiting, setIsActiveWaiting] = useState<boolean>(false)
    const [isActiveProcess, setIsActiveProcess] = useState<boolean>(false)
    const [isActiveEnded, setIsActiveEnded] = useState<boolean>(false)

    // тестовые данные
    const [productsItem, setProductsItem] = useState([
        {id: 1, title: 'Колесо', price: 25, count: 3},
        {id: 2, title: 'Велосипед', price: 25000000, count: 1},
        {id: 3, title: 'Руль', price: 250, count: 2},
        {id: 4, title: 'Рама', price: 500, count: 1},
        {id: 5, title: 'Вилка', price: 1000, count: 1},
        {id: 6, title: 'Втулка', price: 2000, count: 1},
        {id: 7, title: 'Вынос', price: 1500, count: 1},
    ])
    const [repairItems, setRepairItems] = useState([
        {id: 1, title: 'Замена покрышки', price: 25, count: 3},
        {id: 2, title: 'Сезонное ТО', price: 2500, count: 1},
        {id: 3, title: 'Переспицовка колеса', price: 250, count: 2},
    ])

    // сбор данных с формы
    const formControl = useForm({
        defaultValues: {
            name: '',
            clientDescription: '',
            userMaster: '',
        }
    });
    const onSubmit: SubmitHandler<any> = (data: CreateService) => {
        console.log('сабмит данные', data)

        data.shopId = 1
        data.clientId = user.id
        data.userCreatedId = '03470748-93c9-437d-a91b-5a71c92bad28' // выбор ил селекта
        data.userMasterId = user.id

        data.productDiscountId = 0
        data.workDiscountId = 0

        data.serviceWorks = [
            {
                name: 'string',
                description: 'string',
                quantity: 0,
                quantityUnitId: 0,
                price: 0,
                discount: 0,
                total: 0,
                userId: user.id
            }
        ]
        data.serviceProducts = [
            {
                catalogKey: 'string',
                serialNumber: 'string',
                name: 'string',
                quantity: 0,
                quantityUnitId: 0,
                price: 0,
                discount: 0,
                total: 0,
                userId: user.id
            }
        ]

        // надо сделать проверку на выбор клиента
        // if (!data.clientId) {
        //     console.log('выберите клиента')
        // } else {
        //
        // }

        addNewService(data).then((response: ServiceItem) => {
            formControl.setValue('name', '')
            formControl.setValue('clientDescription', '')
            formControl.setValue('userMaster', '')

            enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
            getWaitingFilteredServices() // запрос, чтобы добавился новый сервис в список
        }).catch((error: any) => {
            let message = error(error.response.data.errorDescription).toString()
            formControl.setError('name', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
            console.error(error.response.data)
        })

        // updateService(data).then((response) => {}
    }

    // хендлеры
    const chooseServiceItem = (ServiceItem: ServiceItem) => {
        console.log('Клик по ремонту', ServiceItem)
        setService(ServiceItem)

        formControl.setValue('name', ServiceItem.name)
        formControl.setValue('clientDescription', ServiceItem.clientDescription)
        formControl.setValue('userMaster', 'Выбранный мастер')
    }
    const chooseClientHandler = (user: IUser) => {
        setUser(user)
        setIsClientChosen(true)
        setChooseClientModal(false)
        console.log('Service click user', user)
    }

    // const handleChangeSelect = (event: SelectChangeEvent) => {
    //     setUserMasterId(event.target.value as string)
    //     console.log(event.target.value)
    // };
    // const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    //     // setUserMasterId(event.target.value as string)
    //     console.log('клик по селекту', event.target.value)
    // };

    // фильтрация сервисов
    const waitingServicesArray = services.filter(s => s.status === 'Waiting' && 'WaitingSupply')
    const inProcessServicesArray = services.filter(s => s.status === 'InProcess')
    const readyServicesArray = services.filter(s => s.status === 'Ready')

    const filterWaitingHandler = () => {
        setFilteredServices(waitingServicesArray)
        setIsActiveWaiting(true)
        setIsActiveProcess(false)
        setIsActiveEnded(false)
    }
    const filterInProcessHandler = () => {
        setFilteredServices(inProcessServicesArray)
        setIsActiveWaiting(false)
        setIsActiveProcess(true)
        setIsActiveEnded(false)
    }
    const filterEndedHandler = () => {
        setFilteredServices(readyServicesArray)
        setIsActiveWaiting(false)
        setIsActiveProcess(false)
        setIsActiveEnded(true)
    }

    // изменение статуса заказа
    const changeServiceStatus = (status: number) => {
        updateServiceStatus({serviceId: service.id, newStatus: status})
    }
    const changeServiceStatusToWaitingSupply = () => {
        updateServiceStatus({serviceId: service.id, newStatus: 2})
        // updateService({...service, name: 'boo'})
    }

    // первый рендер
    useEffect(() => {
        getAllServices() // получение всех сервисов для последующей фильтрации
        getWaitingFilteredServices() // первоначальное отображение списка (ожидание)
        setIsActiveWaiting(true) // цвет кнопки (ожидание)
    }, [])

    return (
        // <div className={s.serviceWrapper}>
        <form onSubmit={formControl.handleSubmit(onSubmit)}>
            <div className={s.serviceBlock}>

                <div className={s.service_leftSide}>
                    <div className={s.leftSide_buttons}>
                        <ChooseClientModal extraCallback={(user: IUser) => {chooseClientHandler(user)}}/>
                        <div className={s.buttons_create}>
                            <Button disabled={isClientChosen}
                                    onClick={() => {alert('Пока что не знаю что с этим делать')}}
                            >
                                Создать ремонт
                            </Button>
                        </div>
                    </div>
                    <div className={s.leftSide_content}>
                        <div className={s.buttons_filter}>
                            <div>
                                <Button className={isActiveWaiting ? style.waiting : ''}
                                        onClick={filterWaitingHandler}
                                >
                                    Ожидают
                                </Button>
                            </div>
                            <div>
                                <Button className={isActiveProcess ? style.process : ''}
                                        onClick={filterInProcessHandler}
                                >
                                    В ремонте
                                </Button>
                            </div>
                            <div>
                                <Button className={isActiveEnded ? style.ended : ''}
                                        onClick={filterEndedHandler}
                                >
                                    Готово
                                </Button>
                            </div>
                        </div>
                        <div className={s.content_title}>
                            {
                                isActiveWaiting &&
                                <div className={s.content_startBtn}>
                                    <Button onClick={() => {changeServiceStatus(1)}}>
                                        Начать ремонт
                                    </Button>
                                </div>
                            }

                            {
                                isActiveProcess &&
                                <div className={s.content_inProcessButtons}>
                                    <Button onClick={changeServiceStatusToWaitingSupply}>
                                        Остановить ремонт
                                    </Button>
                                    <Button onClick={() => {changeServiceStatus(3)}}>
                                        Закончить ремонт
                                    </Button>
                                </div>
                            }

                            {
                                isActiveEnded &&
                                <div className={s.content_doneButtons}>
                                    <Button onClick={() => {changeServiceStatus(1)}}>
                                        Продолжить ремонт
                                    </Button>
                                    <Button onClick={() => {changeServiceStatus(4)}}>
                                        Выдать велосипед
                                    </Button>
                                </div>
                            }
                        </div>
                        <div className={s.content_info}>
                            {
                                isLoading ? <div>Загрузка...</div> :

                                    filteredServices.length === 0 ? <div>Список пуст</div> :

                                        filteredServices.map(service => {
                                            return (
                                                <div className={s.service_item} key={service.id}
                                                     onClick={() => {chooseServiceItem(service)}}
                                                >
                                                    {service.name}
                                                </div>
                                            )
                                        })
                            }
                        </div>
                    </div>
                </div>


                <div className={s.service_rightSide}>
                    <div className={s.rightSide_stuffInput}>
                        <ControlledInput name={'name'} label={'Техника'}
                                         control={formControl}
                                         rules={{required: Errors[0].name}}
                        />
                    </div>
                    <div className={s.rightSide_infoFields}>
                        <div className={s.infoFields_content}>
                            <div className={s.content_detailsInput}>
                                <ControlledInput name={'clientDescription'} label={'Детальное описание'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div className={s.content_masterInput}>
                                <ControlledInput name={'userMaster'} label={'Мастер'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                />

                                {/*<FormControl fullWidth>*/}
                                {/*    <InputLabel id="master-select-label">Мастер</InputLabel>*/}
                                {/*    <Select*/}
                                {/*        labelId="master-select-label"*/}
                                {/*        id="master-select"*/}
                                {/*        name={'userMasterDescription'}*/}
                                {/*        value={userMasterDescription}*/}
                                {/*        label="userMasterDescription"*/}
                                {/*        onChange={handleChangeSelect}*/}
                                {/*    >*/}
                                {/*        /!*<MenuItem value={10}>10%</MenuItem>*!/*/}
                                {/*        /!*<MenuItem value={20}>20%</MenuItem>*!/*/}
                                {/*        */}
                                {/*        {*/}
                                {/*            users.map(u => {*/}
                                {/*                return (*/}
                                {/*                    <MenuItem key={u.user.id} value={u.user.id}>*/}
                                {/*                        {u.user.lastName} {u.user.firstName} {u.user.patronymic}*/}
                                {/*                    </MenuItem>*/}
                                {/*                )*/}
                                {/*            })*/}
                                {/*        }*/}
                                {/*    </Select>*/}
                                {/*</FormControl>*/}

                                {/*<select name="userMasterId" value={userMasterId} onChange={handleChangeSelect}>*/}
                                {/*    {*/}
                                {/*        users.map(u => {*/}
                                {/*            return (*/}
                                {/*                <option key={u.user.id} value={u.user.id}>*/}
                                {/*                    {u.user.lastName} {u.user.firstName} {u.user.patronymic}*/}
                                {/*                </option>*/}
                                {/*            )*/}
                                {/*        })*/}
                                {/*    }*/}
                                {/*</select>*/}

                            </div>
                            <div className={s.content_buttons}>
                                <div className={s.content_saveBtn}>
                                    <Button type={'submit'} disabled={!isClientChosen}>
                                        Сохранить
                                    </Button>
                                </div>
                                <div className={s.content_sumField}>
                                    Сумма
                                </div>
                            </div>
                        </div>
                        <div className={s.infoFields_clientCard}>
                            <ClientCard user={user}/>
                            <div className={s.clientCard_changeClientBtn}>
                                <Button onClick={() => {setChooseClientModal(true)}}>
                                    Выбрать клиента
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={s.rightSide_tables}>
                        <ServiceTable data={productsItem}/>
                        <ServiceTable data={repairItems}/>
                    </div>
                </div>

            </div>
        </form>
        // </div>
    );
};
export default Service;
