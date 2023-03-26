import React, {useEffect, useState} from 'react'
import s from "./Service.module.scss"
import {Button, ControlledClientCard, ControlledInput, ControlledSelect} from "../../../shared/ui"
import {Errors} from "../../../entities/errors/workspaceErrors"
import {CreateService, User} from "../../../entities"
import {SelectProductModal, SelectWorkModal} from "../../../features"
import {ServiceTable} from "./ServiceTable"
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import useService from "./ServiceStore"
import useSelectProductWorkModal
    from "../../../features/ServiceFeatures/SelectProductWorkModals/SelectProductWorkModalStore"
import {useSnackbar} from "notistack"
import useAuth from "../../auth/useAuthUser"

const ServiceForm = () => {

    const {enqueueSnackbar} = useSnackbar()

    const setOpenSelectProductModal = useSelectProductWorkModal(s => s.setOpenSelectProductModal)
    const masters = useService(s => s.masters)
    const currentService = useService(s => s.currentService)
    const setCurrentService = useService(s => s.setCurrentService)

    const addNewService = useService(s => s.addNewService)
    const updateService = useService(s => s.updateService)
    const setOpenSelectWorkModal = useSelectProductWorkModal(s => s.setOpenSelectWorkModal)

    const [isCreating, setIsCreating] = useState(false)
    const [openClientModal, setOpenClientModal] = useState(false)
    const [summProducts, setSummProducts] = useState(0)
    const [summWorks, setSummWorks] = useState(0)

    const formControl = useForm<CreateService>({
        defaultValues: {
            shopId: useAuth.getState().shop?.id,
            id: 0,
            name: '',
            client: {} as User,
            clientDescription: '',
            userMasterId: '',

            productDiscountId: 0,
            workDiscountId: 0,
            userMasterDescription: '',
            userCreatedDescription: '',

            serviceProducts: [],
            serviceWorks: [],
        }
    })

    const onSubmit: SubmitHandler<CreateService> = (data: CreateService) => {
        // создание сервиса
        if (isCreating) {
            console.log('create IF works, new data =', data)
            data.shopId = 1

            addNewService(data).then((res: any) => {
                setIsCreating(false)
                enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})

            }).catch((error: any) => {
                let message = error(error.response.data.errorDescription).toString()
                formControl.setError('name', {type: 'serverError', message: message})
                enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
                console.error(error.response.data)
            })
        }

        // обновление сервиса
        if (!isCreating) {
            console.log('update IF works, updateData = ', data)

            updateService(data).then((res: any) => {
                enqueueSnackbar('Ремонт обновлён', {variant: 'success', autoHideDuration: 3000})
            }).catch((error: any) => {
                let message = error(error.response.data.errorDescription).toString()
                formControl.setError('name', {type: 'serverError', message: message})
                enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
                console.error(error.response.data)
            })
        }
    }

    useEffect(() => {
        let summ = 0
        formControl.getValues('serviceWorks').forEach(n => {
            summ += (n.price * n.quantity)
        })
        setSummWorks(summ)
    }, [formControl.watch('serviceWorks')])

    useEffect(() => {
        let summ = 0
        formControl.getValues('serviceProducts').forEach(n => {
            summ += (n.price * n.quantity)
        })
        setSummProducts(summ)
    }, [formControl.watch('serviceProducts')])


    // очистка всех данных (кнопка ОТМЕНА)
    const clearAllServiceInfo = () => {
        formControl.reset()
        setCurrentService(null)
        setIsCreating(false)
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentService ? currentService.id : 0)
        formControl.setValue('name', currentService ? currentService.name : '')
        formControl.setValue('clientDescription', currentService ? currentService.clientDescription : '')
        formControl.setValue('userMasterId', currentService ? currentService.userMaster?.id : '')
        formControl.setValue('client', currentService ? currentService.client : {} as User)

        formControl.setValue('serviceProducts', currentService ? currentService.products : [])
        formControl.setValue('serviceWorks', currentService ? currentService.works : [])
    }, [currentService])

    return (
        <div className={s.service_rightSide}>
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <ControlledInput name={'name'}
                                 label={'Техника'}
                                 control={formControl}
                                 rules={{required: Errors[0].name}}
                                 divClassName={s.rightSide_stuffInput}
                                 disabled={currentService === null && !isCreating}
                />
                <div className={s.rightSide_infoFields}>
                    <div className={s.infoFields_content}>
                        <ControlledInput name={'clientDescription'}
                                         label={'Детальное описание'}
                                         control={formControl}
                                         rules={{required: Errors[0].name}}
                                         divClassName={s.content_detailsInput}
                                         disabled={currentService === null && !isCreating}
                        />
                        <ControlledSelect control={formControl}
                                          name={'userMasterId'}
                                          label={'Мастер'}
                                          className={s.content_masterInput}
                                          disabled={currentService === null && !isCreating}
                                          data={masters.map((n) => {
                                              return {id: n.id, value: n.firstName ? n.firstName : 'Нет имени'}
                                          })}
                        />
                        <div className={s.content_buttons}>
                            <div className={s.content_saveBtn}>
                                {
                                    isCreating ?
                                        <Button className={s.content_saveBtn} type={'submit'}
                                                disabled={!formControl.formState.isDirty}>Сохранить</Button>
                                        :
                                        formControl.getValues('id') > 0 ?
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
                                              rules={{validate: (value: User) => value.id !== null}}
                        />
                        <Button buttonDivWrapper={s.clientCard_cancelButton}
                                disabled={currentService === null && !isCreating}
                                onClick={clearAllServiceInfo}>
                            Отмена
                        </Button>
                    </div>
                </div>


                <Controller
                    name={'serviceProducts'}
                    control={formControl.control}
                    render={({field}: any) =>
                        <div className={s.rightSide_tables}>
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
                        </div>
                    }
                />
                <Controller
                    name={'serviceWorks'}
                    control={formControl.control}
                    render={({field}: any) =>
                        <div className={s.rightSide_tables}>
                            <ServiceTable data={field.value}
                                          buttonTitle={'Редактор услуг'}
                                          serviceTableCallback={() => {
                                              setOpenSelectWorkModal(true)
                                          }}
                                          disabledButton={(currentService === null && !isCreating)}
                                          summ={summWorks}
                            />
                            <SelectWorkModal works={field.value} setWorks={field.onChange}/>
                        </div>
                    }
                />
            </form>
        </div>
    );
};

export default ServiceForm;