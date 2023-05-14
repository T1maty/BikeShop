import React, {useEffect} from 'react'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import s from './CreateSpecificationModal.module.scss'
import {Button, ControlledCustomCheckbox, ControlledCustomInput,
    CustomModal, LoaderScreen} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'
import useCreateSpecificationModal from './CreateSpecificationModalStore'
import {UpdateSpecification} from '../../../entities/requests/UpdateSpecification'

export const CreateSpecificationModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCreateSpecificationModal(s => s.openCreateSpecificationModal)
    const setOpen = useCreateSpecificationModal(s => s.setOpenCreateSpecificationModal)
    const isLoading = useCreateSpecificationModal(s => s.isLoading)
    const errorStatus = useCreateSpecificationModal(s => s.errorStatus)

    const currentSpecification = useCreateSpecificationModal(s => s.currentSpecification)
    const setCurrentSpecification = useCreateSpecificationModal(s => s.setCurrentSpecification)
    const specifications = useCreateSpecificationModal(s => s.specifications)
    const getSpecifications = useCreateSpecificationModal(s => s.getSpecifications)
    const addNewSpecification = useCreateSpecificationModal(s => s.addNewSpecification)
    const updateSpecification = useCreateSpecificationModal(s => s.updateSpecification)

    const formControl = useForm<UpdateSpecification>({
        defaultValues: {
            id: 0,
            name: '',
            enabled: true,
        }
    })

    const onSubmit: SubmitHandler<UpdateSpecification> = (data: UpdateSpecification) => {
        if (currentSpecification === null) {
            addNewSpecification(data.name)
        }
        if (currentSpecification !== null) {
            updateSpecification(data)
        }
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentSpecification ? currentSpecification.id : 0)
        formControl.setValue('name', currentSpecification ? currentSpecification.name : '')
        formControl.setValue('enabled', currentSpecification ? currentSpecification.enabled : true)
    }, [currentSpecification])

    useEffect(() => {
        if (errorStatus === 'success') {
            enqueueSnackbar('Операция выполнена', {variant: 'success', autoHideDuration: 3000})
            formControl.reset()
        }
        if (errorStatus === 'error') {
            enqueueSnackbar('Ошибка сервера', {variant: 'error', autoHideDuration: 3000})
        }
    }, [errorStatus])

    useEffect(() => {
        open && getSpecifications()
    }, [])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {setOpen(false)}}
            >
                <div className={s.createSpecificationModal_mainBlock}>

                    <div className={s.specificationModal_specifications}>
                        <div className={s.specifications_specificationsList}>

                            {
                                specifications.map(spec => (
                                    <div key={spec.id}
                                        className={spec.id === currentSpecification?.id ? s.shop_item_active : s.shop_item}
                                        onClick={() => {setCurrentSpecification(spec)}}
                                    >
                                        <div><span>ID:</span> {spec.id}</div>
                                        <div><span>Название:</span> {spec.name}</div>
                                        <div><span>Активен:</span> {spec.enabled ? 'Да' : 'Нет'}</div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    <div className={s.specificationModal_createBlock}>
                        <form onSubmit={formControl.handleSubmit(onSubmit)}>
                            <div className={s.shopStorageModal_inputFields}>
                                <ControlledCustomInput name={'name'}
                                                       placeholder={'Название спецификации'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomCheckbox name={'enabled'}
                                                          label={'Спецификация включена'}
                                                          control={formControl}
                                                          divClassName={s.infoBlock_checkbox}
                                />
                                <Button buttonDivWrapper={s.infoBlock_cancelBtn}
                                        disabled={currentSpecification === null}
                                        onClick={() => {setCurrentSpecification(null)}}
                                >
                                    Отмена
                                </Button>
                            </div>
                            <div className={s.footer_buttons}>
                                <Button type={'submit'}>
                                    {currentSpecification === null ? 'Создать спецификацию' : 'Обновить спецификацию'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </CustomModal>
        )
    }
}