import React, {useEffect, useState} from 'react'
import s from "./Service.module.scss"
import {Button, ControlledClientCard, ControlledCustomInput, ControlledCustomTextarea} from '../../../shared/ui'
import {Errors} from "../../../entities/errors/workspaceErrors"
import {ServiceFormModel, useCurrency, User} from "../../../entities"
import {PrintModal, SelectProductModal, SelectWorkModal} from "../../../features"
import {Controller, SubmitHandler, UseFormReturn} from "react-hook-form"
import useService from "./ServiceStore"
import useSelectProductWorkModal
    from "../../../features/ServiceFeatures/SelectProductWorkModals/SelectProductWorkModalStore"
import {useSnackbar} from "notistack"
import Select from "react-select"
import ServiceTableWork from "./ServiceTableWork"
import ServiceTableProduct from "./ServiceTableProduct"
import {CheckForServiceWork} from "../../../widgets"
import {ServiceSticker} from "../../../widgets/workspace/WorkActs/ServiceSticker"

export const ServiceForm = (props: { children: UseFormReturn<ServiceFormModel, any> }) => {

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

    const [openClientModal, setOpenClientModal] = useState(false)
    const [summProducts, setSummProducts] = useState(0)
    const [summWorks, setSummWorks] = useState(0)

    const [printAct, setPrintAct] = useState(false)
    const [printSticker, setPrintSticker] = useState(false)

    const [selectedUserId, setSelectedUserId] = useState('')

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    const checkForZero = (onChange: (d: any[]) => void) => {
        const func = (data: any[]) => {
            let newData = data.filter(n => n.quantity != 0)
            onChange(newData)
        }
        return func
    }

    useEffect(() => {
        setSelectedUserId(formControl.getValues('userMasterId'))
    }, [formControl.watch('userMasterId')])

    const onSubmit: SubmitHandler<ServiceFormModel> = (data: ServiceFormModel) => {
        // создание сервиса
        if (isCreating) {
            console.log('create IF works, new data =', data)
            addNewService(data, () => {
                enqueueSnackbar('Ремонт создан', {variant: 'success', autoHideDuration: 3000})
                setPrintSticker(true)
                setPrintAct(true)
            })
        }

        // обновление сервиса
        if (!isCreating) {
            console.log('update IF works, updateData = ', data)
            updateService(data, () => {
                enqueueSnackbar('Ремонт обновлен', {variant: 'success', autoHideDuration: 3000})
            })
        }
    }

    // очистка всех данных (кнопка ОТМЕНА)
    const clearAllServiceInfo = () => {
        setCurrentService(null)
        setIsCreating(false)
    }

    useEffect(() => {
        let summ = 0
        formControl.getValues('serviceWorks')?.forEach(n => {
            summ += (n.price * n.quantity + n.complicationPrice - n.discount)
        })
        setSummWorks(summ)
    }, [formControl.watch('serviceWorks')])

    useEffect(() => {
        let summ = 0
        formControl.getValues('serviceProducts')?.forEach(n => {
            summ += (n.price * n.quantity - n.discount)
        })
        setSummProducts(summ)
    }, [formControl.watch('serviceProducts')])

    const setMaster = (v: string) => {
        let user = masters.find(n => n.id === v)
        if (user != null) return user
        else return null
    }

    useEffect(() => {
        formControl.reset()

        if (currentService != null) {
            formControl.setValue('name', currentService?.service.name!)
            formControl.setValue('clientDescription', currentService?.service.clientDescription!)
            formControl.setValue('userMasterId', currentService?.service.userMasterId!)
            formControl.setValue('clientId', currentService?.service.clientId!)
            formControl.setValue('userCreatedDescription', currentService?.service.userCreatedDescription!)
            formControl.setValue('userMasterDescription', currentService?.service.userMasterDescription!)
            formControl.setValue('workDiscountId', currentService?.service.workDiscountId!)
            formControl.setValue('productDiscountId', currentService?.service.productDiscountId!)
            formControl.setValue('id', currentService?.service.id!)

            formControl.setValue('serviceProducts', currentService ? currentService.products : [])
            formControl.setValue('serviceWorks', currentService ? currentService.works : [])
        }
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
            <PrintModal open={printAct}
                        setOpen={setPrintAct}
                        children={<CheckForServiceWork children={currentService!}/>}
            />
            <PrintModal open={printSticker}
                        setOpen={setPrintSticker}
                        children={<ServiceSticker children={currentService!}/>}
            />
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
                        <ControlledCustomTextarea name={'clientDescription'}
                                                  placeholder={'Детальное описание'}
                                                  control={formControl}
                                                  rules={{required: Errors[0].name}}
                                                  divClassName={s.content_detailsInput}
                                                  disabled={currentService === null && !isCreating}
                        />
                        <div className={s.content_selectMaster}>
                            <Controller
                                name={'userMasterId'}
                                control={formControl.control}
                                render={({field}: any) =>
                                    <Select
                                        className={s.select_box}
                                        placeholder={'Мастер'}
                                        options={masters}
                                        isDisabled={currentService === null && !isCreating}
                                        isSearchable
                                        value={setMaster(field.value)}
                                        onChange={(value: any) => {
                                            field.onChange(value.id)
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
                            <div className={s.content_sumField}>
                                {r((summWorks + summProducts) * fbts.c) + fbts.s}
                            </div>
                        </div>
                    </div>
                    <div className={s.infoFields_clientCard}>
                        <ControlledClientCard name={'clientId'}
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
                        name={'serviceProducts'}
                        control={formControl.control}
                        render={({field}: any) =>
                            <>
                                <ServiceTableProduct data={field.value}
                                                     serviceTableCallback={() => {
                                                         setOpenSelectProductModal(true)
                                                     }}
                                                     disabledButton={(currentService === null && !isCreating)}
                                                     summ={summProducts}
                                                     setData={checkForZero(field.onChange)}
                                />
                                <SelectProductModal products={field.value}
                                                    setProducts={checkForZero(field.onChange)}
                                                    defaultMasterId={selectedUserId}
                                />
                            </>
                        }
                    />
                    <Controller
                        name={'serviceWorks'}
                        control={formControl.control}
                        render={({field}: any) =>
                            <>
                                <ServiceTableWork data={field.value}
                                                  setData={checkForZero(field.onChange)}
                                                  serviceTableCallback={() => {
                                                      setOpenSelectWorkModal(true)
                                                  }}
                                                  disabledButton={(currentService === null && !isCreating)}
                                                  summ={summWorks}
                                />
                                <SelectWorkModal works={field.value} setWorks={checkForZero(field.onChange)}
                                                 defaultMasterId={selectedUserId}
                                                 serviceId={formControl.getValues('id')}
                                />
                            </>
                        }
                    />
                </div>
            </form>
        </div>
    )
}