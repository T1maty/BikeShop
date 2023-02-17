import React, {useEffect, useState} from 'react';
import s from './Service.module.scss'
import {ChooseClientModal, ClientCard} from '../../../features';
import {Button, ControlledInput, InputUI} from '../../../shared/ui';
import {ServiceTable} from '../../index';
import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateRepair} from "../../../entities/requests/CreateRepair";
import {useSnackbar} from "notistack";
import useService from "./ServiceStore";
import {Errors} from "../../../entities/errors/workspaceErrors";

const Service = () => {

    const {enqueueSnackbar} = useSnackbar()
    const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)
    const addNewRepair = useService(s => s.addNewRepair)

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
            stuff: '',
            description: '',
            master: '',
        }
    });
    const onSubmit: SubmitHandler<CreateRepair> = (data: CreateRepair) => {
        console.log(data)

        formControl.setValue('stuff', '')
        formControl.setValue('description', '')
        formControl.setValue('master', '')

        // addNewRepair(data).then((response: any) => {
        //     formControl.setValue('stuff', '')
        //     formControl.setValue('description', '')
        //     formControl.setValue('master', '')
        //
        //     enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
        // }).catch((error: any) => {
        //     let message = error(error.response.data.errorDescription).toString()
        //     formControl.setError('stuff', {type: 'serverError', message: message})
        //     enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
        //     console.error(error.response.data)
        // })
    }

    // useEffect(() => {
    //
    // }, [])

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
                                repair.map(r => {
                                    return (
                                        <div key={r.id}>{r.repair}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>


                <div className={s.service_rightSide}>
                    <div className={s.rightSide_stuffInput}>
                        {/*<InputUI placeholder={'Техника'} clearInputValue={() => {}}/>*/}
                        <ControlledInput name={'stuff'} label={'Техника'}
                                         control={formControl}
                                         rules={{required: Errors[0].name}}
                        />
                    </div>

                    <div className={s.rightSide_infoFields}>
                        <div className={s.infoFields_content}>
                            <div className={s.content_detailsInput}>
                                {/*<InputUI placeholder={'Детальное описание'} clearInputValue={() => {}}/>*/}
                                <ControlledInput name={'description'} label={'Детальное описание'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div className={s.content_masterInput}>
                                {/*<InputUI placeholder={'Мастер'} clearInputValue={() => {}}/>*/}
                                <ControlledInput name={'master'} label={'Мастер'}
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
                                    Изменить клиента
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
