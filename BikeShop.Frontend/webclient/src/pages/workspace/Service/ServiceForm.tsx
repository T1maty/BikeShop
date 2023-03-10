import React from 'react';
import s from "./Service.module.scss";
import {Button, ControlledClientCard, ControlledInput, ControlledSelect} from "../../../shared/ui";
import {Errors} from "../../../entities/errors/workspaceErrors";
import {CreateService, ServiceItem} from "../../../entities";
import {SelectProductModal, SelectWorkModal} from "../../../features";
import {ServiceTable} from "./ServiceTable";
import {SubmitHandler, useForm} from "react-hook-form";
import useService from "./ServiceStore";
import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore";
import useSelectProductWorkModal from "../../../features/SelectProductWorkModals/SelectProductWorkModalStore";
import {useSnackbar} from "notistack";

const ServiceForm = () => {

    const {enqueueSnackbar} = useSnackbar()

    const currentService = useService(s => s.currentService)
    const setCurrentService = useService(s => s.setCurrentService)
    const masters = useService(s => s.masters)
    const setSelectProductModal = useSelectProductWorkModal(s => s.setSelectProductModal)
    const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)
    const addNewService = useService(s => s.addNewService)
    const updateService = useService(s => s.updateService)
    const addServiceProduct = useService(s => s.addServiceProduct)
    const setClient = useService(s => s.setServiceClient)
    const formControl = useForm<CreateService>({
        defaultValues: {
            name: '',
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

    React.useEffect(() => {
        formControl.reset()
        formControl.setValue('name', currentService ? currentService.name : '')
        formControl.setValue('clientDescription', currentService ? currentService.clientDescription : '')
        formControl.setValue('userMasterId', currentService ? currentService.userMaster.id : '')
        formControl.setValue('clientId', currentService ? currentService.client?.id : '')
    }, [currentService])

    const onSubmit: SubmitHandler<CreateService> = (data: CreateService) => {
        // создание сервиса
        if (currentService === null) {
            console.log('create IF works, new data =', data)

            data.id = 0

            data.serviceWorks = []
            data.serviceProducts = []

            addNewService(data).then((res: any) => {

                enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
            }).catch((error: any) => {
                let message = error(error.response.data.errorDescription).toString()
                formControl.setError('name', {type: 'serverError', message: message})
                enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
                console.error(error.response.data)
            })
        }

        // обновление сервиса
        if (currentService != null) {
            data.id = currentService.id
            console.log('update IF works, updateData = ', data)

            data.serviceWorks = currentService.works
            data.serviceProducts = currentService.products


            updateService(data).then((res: any) => {
                clearAllServiceInfo()
                enqueueSnackbar('Ремонт обновлён', {variant: 'success', autoHideDuration: 3000})
            }).catch((error: any) => {
                let message = error(error.response.data.errorDescription).toString()
                formControl.setError('name', {type: 'serverError', message: message})
                enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
                console.error(error.response.data)
            })

        }
    }

    // очистка всех данных (кнопка ОТМЕНА)
    const clearAllServiceInfo = () => {
        formControl.reset()
        setCurrentService(null)

    }

    return (

        <div className={s.service_rightSide}>
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <ControlledInput name={'name'}
                                 label={'Техника'}
                                 control={formControl}
                                 rules={{required: Errors[0].name}}
                                 className={s.rightSide_stuffInput}
                                 disabled={currentService === null}
                />
                <div className={s.rightSide_infoFields}>

                    <div className={s.infoFields_content}>

                        <ControlledInput name={'clientDescription'}
                                         label={'Детальное описание'}
                                         control={formControl}
                                         rules={{required: Errors[0].name}}
                                         className={s.content_detailsInput}
                                         disabled={currentService === null}
                        />


                        <ControlledSelect control={formControl} name={'userMasterId'} label={'Мастер'}
                                          className={s.content_masterInput}
                                          data={masters.map(n => {
                                              return {id: n.id, value: n.firstName + ' ' + n.lastName}
                                          })}/>


                        <div className={s.content_buttons}>
                            <div className={s.content_saveBtn}>
                                {currentService != null ?
                                    <Button className={s.content_saveBtn} type={'submit'}
                                            disabled={!formControl.formState.isDirty}>
                                        {currentService.id === 0 ?
                                            'Сохранить'
                                            :
                                            'Обновить'
                                        }
                                    </Button>
                                    :
                                    <Button className={s.content_saveBtn} onClick={() => {
                                        setCurrentService({} as ServiceItem)
                                    }
                                    }>
                                        Создать
                                    </Button>
                                }
                            </div>
                            <div className={s.content_sumField}> Сумма</div>
                        </div>
                    </div>


                    <div className={s.infoFields_clientCard}>

                        <ControlledClientCard control={formControl} name={'clientId'}/>

                        <Button disabled={currentService === null}
                                onClick={clearAllServiceInfo}>
                            Отмена
                        </Button>


                    </div>


                </div>
                <div className={s.rightSide_tables}>

                    <SelectProductModal products={currentService?.products ? currentService?.products : []}
                                        addProduct={addServiceProduct}/>
                    <ServiceTable data={currentService ? currentService.products : null}
                                  buttonTitle={'Редактор товаров'}
                                  serviceTableCallback={() => {
                                      setSelectProductModal(true)
                                  }}
                    />
                    <SelectWorkModal/>

                    <ServiceTable data={currentService?.works ? currentService?.works : []}
                        // data={worksItems}
                                  buttonTitle={'Редактор услуг'}
                                  serviceTableCallback={() => {

                                  }}/>
                </div>
            </form>
        </div>

    );
};

export default ServiceForm;