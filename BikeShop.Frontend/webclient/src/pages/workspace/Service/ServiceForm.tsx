import React, {useEffect, useState} from 'react'
import s from "./Service.module.scss"
import {Button, ControlledClientCard, ControlledCustomInput,} from '../../../shared/ui'
import {Errors} from "../../../entities/errors/workspaceErrors"
import {ServiceWithData, User} from "../../../entities"
import {SelectProductModal, SelectWorkModal} from "../../../features"
import {ServiceTable} from "./ServiceTable"
import {Controller, SubmitHandler, UseFormReturn} from "react-hook-form"
import useService from "./ServiceStore"
import useSelectProductWorkModal
    from "../../../features/ServiceFeatures/SelectProductWorkModals/SelectProductWorkModalStore"
import {useSnackbar} from "notistack"
import Select from "react-select"

export const ServiceForm = (props: { children: UseFormReturn<ServiceWithData, any> }) => {

    const formControl = props.children
    const {enqueueSnackbar} = useSnackbar()

    const setOpenSelectProductModal = useSelectProductWorkModal(s => s.setOpenSelectProductModal)
    const setOpenSelectWorkModal = useSelectProductWorkModal(s => s.setOpenSelectWorkModal)
    const errorStatus = useService(s => s.errorStatus)
    const isCreating = useService(s => s.isCreating)
    const setIsCreating = useService(s => s.setIsCreating)

    const masters = useService(s => s.masters)

    const currentService = useService(s => s.currentService)
    const setCurrentService = useService(s => s.setCurrentService)
    const addNewService = useService(s => s.addNewService)
    const updateService = useService(s => s.updateService)

    // const [isCreating, setIsCreating] = useState(false)
    const [openClientModal, setOpenClientModal] = useState(false)
    const [summProducts, setSummProducts] = useState(0)
    const [summWorks, setSummWorks] = useState(0)


    const onSubmit: SubmitHandler<ServiceWithData> = (data: ServiceWithData) => {
        // создание сервиса
        if (isCreating) {
            //data.service.userId = LocalStorage.userId()!
            //data.shopId = parseInt(LocalStorage.shopId()!)
            setIsCreating(false)
            console.log('create IF works, new data =', data)
            //addNewService(data)
        }

        // обновление сервиса
        if (!isCreating) {
            //data.userId = LocalStorage.userId()!
            console.log('update IF works, updateData = ', data)
            //updateService(data, () => {formControl.reset()})
        }
    }

    // очистка всех данных (кнопка ОТМЕНА)
    const clearAllServiceInfo = () => {
        formControl.reset()
        setCurrentService(null)
        setIsCreating(false)
    }

    useEffect(() => {
        let summ = 0
        formControl.getValues('works').forEach(n => {
            summ += (n.price * n.quantity)
        })
        setSummWorks(summ)
    }, [formControl.watch('works')])

    useEffect(() => {
        let summ = 0
        formControl.getValues('products').forEach(n => {
            summ += (n.price * n.quantity)
        })
        setSummProducts(summ)
    }, [formControl.watch('products')])

    useEffect(() => {
        formControl.reset()
        //formControl.setValue('id', currentService ? currentService.service.id : 0)
        //formControl.setValue('name', currentService ? currentService.service.name : '')
        //formControl.setValue('clientDescription', currentService ? currentService.service.clientDescription : '')
        //formControl.setValue('userMasterId', currentService ? currentService.service.userMasterId : '')

        //formControl.setValue('client', currentService ? currentService.service.client : {} as User)

        //formControl.setValue('serviceProducts', currentService ? currentService.products : [])
        //formControl.setValue('serviceWorks', currentService ? currentService.works : [])
    }, [currentService])

    useEffect(() => {
        if (errorStatus === 'success') {
            enqueueSnackbar('Операция выполнена', {variant: 'success', autoHideDuration: 3000})
        }
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    return (
        <div className={s.service_rightSide}>
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <ControlledCustomInput name={'name'}
                                       placeholder={'Техника'}
                                       control={formControl}
                                       rules={{required: Errors[0].name}}
                                       divClassName={s.rightSide_stuffInput}
                                       disabled={currentService === null && !isCreating}
                />
                <div className={s.rightSide_infoFields}>
                    <div className={s.infoFields_content}>
                        <ControlledCustomInput name={'clientDescription'}
                                               placeholder={'Детальное описание'}
                                               control={formControl}
                                               rules={{required: Errors[0].name}}
                                               divClassName={s.content_detailsInput}
                                               disabled={currentService === null && !isCreating}
                        />
                        <div className={s.content_selectMaster}>
                            <Controller
                                name={'service'}
                                control={formControl.control}
                                render={({field}: any) =>
                                    <Select
                                        className={s.select_box}
                                        placeholder={'Мастер'}
                                        options={masters}
                                        isDisabled={currentService === null && !isCreating}
                                        isSearchable
                                        value={masters.find(n => n.id === field.value.userMasterId)}
                                        onChange={(value: any) => {
                                            field.onChange({...field.value, userMasterId: value.id})
                                        }}
                                        noOptionsMessage={() => 'Мастер не найден'}
                                        getOptionLabel={label => label!.firstName}
                                        getOptionValue={value => value!.firstName}
                                    />
                                }
                            />
                        </div>

                        <div className={s.content_buttons}>
                            <div className={s.content_saveBtn}>
                                {
                                    isCreating ?
                                        <Button className={s.content_saveBtn} type={'submit'}
                                                disabled={!formControl.formState.isDirty}>Сохранить</Button>
                                        :
                                        formControl.getValues('service').id > 0 ?
                                            <Button className={s.content_saveBtn} type={'submit'}
                                                    disabled={!formControl.formState.isDirty}>Обновить</Button>
                                            :
                                            <Button className={s.content_saveBtn}
                                                    onClick={() => {
                                                        formControl.reset()
                                                        setIsCreating(true)
                                                        setOpenClientModal(true)
                                                    }}
                                            >
                                                Создать
                                            </Button>
                                }
                            </div>
                            <div className={s.content_sumField}>{summWorks + summProducts}</div>
                        </div>
                    </div>
                    <div className={s.infoFields_clientCard}>
                        <ControlledClientCard name={'client'}
                                              control={formControl}
                                              disabled={!isCreating}
                                              state={openClientModal}
                                              setState={setOpenClientModal}
                                              rules={{validate: (value: User) => value?.id !== null}}
                        />
                        <Button buttonDivWrapper={s.clientCard_cancelButton}
                                disabled={currentService === null && !isCreating}
                                onClick={clearAllServiceInfo}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>

                <div className={s.rightSide_tables}>
                    <Controller
                        name={'products'}
                        control={formControl.control}
                        render={({field}: any) =>
                            <>
                                <ServiceTable data={field.value}
                                              buttonTitle={'Редактор товаров'}
                                              serviceTableCallback={() => {
                                                  setOpenSelectProductModal(true)
                                              }}
                                              disabledButton={(currentService === null && !isCreating)}
                                              summ={summProducts}
                                />
                                <SelectProductModal products={field.value}
                                                    setProducts={field.onChange}/>
                            </>
                        }
                    />
                    <Controller
                        name={'works'}
                        control={formControl.control}
                        render={({field}: any) =>
                            <>
                                <ServiceTable data={field.value}
                                              buttonTitle={'Редактор услуг'}
                                              serviceTableCallback={() => {
                                                  setOpenSelectWorkModal(true)
                                              }}
                                              disabledButton={(currentService === null && !isCreating)}
                                              summ={summWorks}
                                />
                                <SelectWorkModal works={field.value} setWorks={field.onChange}/>
                            </>
                        }
                    />
                </div>
            </form>
        </div>
    )
}