import React, {useEffect, useState} from 'react'
import s from "./Service.module.scss"
import {Button, ControlledClientCard, ControlledCustomInput, ControlledCustomTextarea} from '../../../shared/ui'
import {Errors} from "../../../entities/errors/workspaceErrors"
import {CatalogAPI, LocalStorage, ServiceFormModel, useCurrency, User} from "../../../entities"
import {SelectProductModal, SelectWorkModal} from "../../../features"
import {Controller, SubmitHandler, UseFormReturn} from "react-hook-form"
import useService from "./ServiceStore"
import useSelectProductWorkModal
    from "../../../features/ServiceFeatures/SelectProductWorkModals/SelectProductWorkModalStore"
import {useSnackbar} from "notistack"
import Select from "react-select"
import ServiceTableWork from "./ServiceTableWork"
import ServiceTableProduct from "./ServiceTableProduct"
import {
    BarcodeScannerListenerProvider
} from "../../../app/providers/BarcodeScannerListenerProvider/BarcodeScannerListenerProvider";
import useSelectProduct from "../SelectProductWork/SelectProductStore";
import InstantServiceModal from "./InstantServiceModal";
import {useApp} from "../../../entities/globalStore/AppStore";

export const ServiceForm = (props: { children: UseFormReturn<ServiceFormModel, any> }) => {

    const formControl = props.children
    const {enqueueSnackbar} = useSnackbar()

    const setOpenSelectProductModal = useSelectProductWorkModal(s => s.setOpenSelectProductModal)
    const setOpenSelectWorkModal = useSelectProductWorkModal(s => s.setOpenSelectWorkModal)
    const isCreating = useService(s => s.isCreating)
    const setIsCreating = useService(s => s.setIsCreating)


    const masters = useService(s => s.masters)

    const currentService = useService(s => s.currentService)
    const setCurrentService = useService(s => s.setCurrentService)
    const addNewService = useService(s => s.addNewService)
    const updateService = useService(s => s.updateService)
    const conv = useSelectProduct(s => s.convert)

    const AgentPrintServiceIncomeAct = useApp(n => n.AgentPrintServiceIncomeAct)
    const AgentPrintServiceSticker = useApp(n => n.AgentPrintServiceSticker)

    const [openClientModal, setOpenClientModal] = useState(false)
    const [isModal, setISModal] = useState(false)
    const [summProducts, setSummProducts] = useState(0)
    const [summWorks, setSummWorks] = useState(0)

    const [bufData, setBufData] = useState<ServiceFormModel | null>(null)

    const [selectedUserId, setSelectedUserId] = useState('')

    const fbts = useCurrency(s => s.fromBaseToSelected)
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
            setBufData(data)
            setISModal(true)
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

    const onBarcodeHandler = (lastBarcode: string) => {
        enqueueSnackbar(`Штрихкод ${lastBarcode}`, {variant: 'default', autoHideDuration: 3000})

        console.log('Barcode: ', lastBarcode)
        CatalogAPI.getProductByBarcode(lastBarcode).then(r => {
            enqueueSnackbar('Товар добавлен', {variant: 'success', autoHideDuration: 3000})
            let prods = formControl.getValues('serviceProducts')

            let actual = prods.find(n => n.productId === r.data.id)
            if (actual != undefined) {
                actual.quantity++
            } else {
                let item = conv(r.data, selectedUserId)
                item.userId = LocalStorage.userId()!
                item.quantity = 1
                prods.push(item)
            }

            formControl.setValue('serviceProducts', prods)

        }).catch(() => {
            enqueueSnackbar('Товар не найден', {variant: 'warning', autoHideDuration: 5000})
        })
    }

    return (
        <BarcodeScannerListenerProvider onBarcodeRead={onBarcodeHandler}>
            <div className={s.service_rightSide}>
                <InstantServiceModal open={isModal} setOpen={setISModal} onSuccess={(isInstant) => {
                    console.log('create IF works, new data =', bufData)
                    addNewService(bufData!, (id) => {
                        enqueueSnackbar('Ремонт створено', {variant: 'success', autoHideDuration: 3000})
                        if (isInstant) {
                            AgentPrintServiceIncomeAct(id, 2)
                            AgentPrintServiceSticker(id, 1)
                            enqueueSnackbar('Печать двух актів приходу та стікеру', {
                                variant: 'success',
                                autoHideDuration: 3000
                            })
                        }
                    })
                }}/>
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
                                                      rules={{required: "Заполнить!"}}
                                                      divClassName={s.content_detailsInput}
                                                      disabled={currentService === null && !isCreating}
                            />
                            <div className={s.content_selectMaster}>
                                <Controller
                                    name={'userMasterId'}
                                    control={formControl.control}
                                    rules={{required: "Обязательно выберете мастера"}}
                                    render={({field}: any) =>
                                        <>
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
                                                getOptionLabel={label => label!.lastName}
                                                getOptionValue={value => value!.lastName}
                                            />
                                            {formControl.formState.errors['userMasterId'] ?
                                                <div
                                                    className={s.error}>{formControl.formState.errors['userMasterId']?.message}</div> : <></>}
                                        </>
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
                                                            console.log(currentService?.service.userMasterId)
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
                                                         disabledButton={(currentService === null && !isCreating) || formControl.getValues('userMasterId') === ''}
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
                                                      disabledButton={(currentService === null && !isCreating) || formControl.getValues('userMasterId') === ''}
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
        </BarcodeScannerListenerProvider>
    )
}