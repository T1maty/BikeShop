import React, {useEffect, useState} from 'react';
import s from './Service.module.scss'
import {ChooseClientModal} from '../../../features';
import {Button, ControlledInput} from '../../../shared/ui';
import {ServiceTable} from '../../index';
import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateService} from "../../../entities/requests/CreateService";
import {useSnackbar} from "notistack";
import useService from "./ServiceStore";
import {Errors} from "../../../entities/errors/workspaceErrors";
import {ClientCard} from "../../../widgets";
import useCashboxGlobal from "../Cashbox/CashboxGlobalStore";
import {ServiceItem} from "../../../entities/responses/ServiceItem";

const Service = () => {

    const {enqueueSnackbar} = useSnackbar()
    const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)
    const userId = useCashboxGlobal(s => s.userId)
    const isLoading = useService(s => s.isLoading)
    const services = useService(s => s.services)
    const addNewService = useService(s => s.addNewService)
    const getAllServices = useService(s => s.getAllServices)

    const [repair, setRepair] = useState([
        {id: 1, repair: 'repair 01'},
        {id: 2, repair: 'repair 02'},
        {id: 3, repair: 'repair 03'},
        {id: 4, repair: 'repair 04'},
        {id: 5, repair: 'repair 05'},
    ])

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

    const formControl = useForm({
        defaultValues: {
            name: '',
            clientDescription: '',
            userMasterDescription: '',
        }
    });
    const onSubmit: SubmitHandler<any> = (data: CreateService) => {
        console.log(data)

        data.shopId = 1
        data.clientId = userId

        addNewService(data).then((response: ServiceItem) => {
            formControl.setValue('name', '')
            formControl.setValue('clientDescription', '')
            formControl.setValue('userMasterDescription', '')

            enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
            getAllServices()
        }).catch((error: any) => {
            let message = error(error.response.data.errorDescription).toString()
            formControl.setError('name', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
            console.error(error.response.data)
        })
    }

    useEffect(() => {
        getAllServices()
    }, [])

    return (
        // <div className={s.serviceWrapper}>
        <form onSubmit={formControl.handleSubmit(onSubmit)}>
            <div className={s.serviceBlock}>

                <div className={s.service_leftSide}>
                    <div className={s.leftSide_buttons}>
                        <ChooseClientModal/>
                        <div className={s.buttons_create}>
                            <Button onClick={() => {
                                setChooseClientModal(true)
                            }}>
                                Создать ремонт
                            </Button>
                        </div>
                        <div className={s.buttons_info}>
                            <div>
                                <Button onClick={() => {
                                }}>
                                    Ожидают
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {
                                }}>
                                    В ремонте
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => {
                                }}>
                                    Готово
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={s.leftSide_content}>
                        <div className={s.content_title}>
                            Таблица ремонтов
                        </div>
                        <div className={s.content_info}>
                            {
                                isLoading ? <div>Загрузка...</div> :

                                services.map(s => {
                                    return (
                                        <div key={s.id}>{s.name}</div>
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
                                <ControlledInput name={'userMasterDescription'} label={'Мастер'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div className={s.content_buttons}>
                                <div className={s.content_saveBtn}>
                                    <Button type={'submit'}>
                                        Сохранить
                                    </Button>
                                </div>
                                <div className={s.content_cancelBtn}>
                                    <Button onClick={() => {
                                    }}>
                                        Отмена
                                    </Button>
                                </div>
                                <div className={s.content_sumField}>
                                    Сумма
                                </div>
                            </div>
                        </div>
                        <div className={s.infoFields_clientCard}>
                            <ClientCard/>
                            <div className={s.clientCard_changeClientBtn}>
                                <Button onClick={() => {
                                    setChooseClientModal(true)
                                }}>
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
