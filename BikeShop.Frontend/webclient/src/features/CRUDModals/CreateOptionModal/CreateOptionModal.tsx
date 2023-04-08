import React, {useEffect} from 'react'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import s from '../CreateSpecificationModal/CreateSpecificationModal.module.scss'
import {Button, ControlledCustomCheckbox, ControlledCustomInput,
    CustomModal, LoaderScreen} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'
import {UpdateSpecification} from '../../../entities/requests/UpdateSpecification'
import useCreateOptionModal from './CreateOptionModalStore'

export const CreateOptionModal = () => {

    const {enqueueSnackbar} = useSnackbar()

    const open = useCreateOptionModal(s => s.openCreateOptionModal)
    const setOpen = useCreateOptionModal(s => s.setOpenCreateOptionModal)
    const isLoading = useCreateOptionModal(s => s.isLoading)
    const errorStatus = useCreateOptionModal(s => s.errorStatus)

    const currentOption = useCreateOptionModal(s => s.currentOption)
    const setCurrentOption = useCreateOptionModal(s => s.setCurrentOption)
    const options = useCreateOptionModal(s => s.options)
    const getOptions = useCreateOptionModal(s => s.getOptions)
    const addNewOption = useCreateOptionModal(s => s.addNewOption)
    const updateOption = useCreateOptionModal(s => s.updateOption)

    const formControl = useForm<UpdateSpecification>({
        defaultValues: {
            id: 0,
            name: '',
            enabled: true,
        }
    })

    const onSubmit: SubmitHandler<UpdateSpecification> = (data: UpdateSpecification) => {
        if (currentOption === null) {
            addNewOption(data.name)
        }
        if (currentOption !== null) {
            updateOption(data)
        }
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentOption ? currentOption.id : 0)
        formControl.setValue('name', currentOption ? currentOption.name : '')
        formControl.setValue('enabled', currentOption ? currentOption.enabled : true)
    }, [currentOption])

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
        getOptions()
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

                            {options.map(spec => (
                                <div key={spec.id}
                                     className={spec.id === currentOption?.id ? s.shop_item_active : s.shop_item}
                                     onClick={() => {
                                         setCurrentOption(spec)
                                     }}
                                >
                                    <div><span>ID:</span> {spec.id}</div>
                                    <div><span>Название:</span> {spec.name}</div>
                                    <div><span>Активен:</span> {spec.enabled ? 'Да' : 'Нет'}</div>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className={s.specificationModal_createBlock}>
                        <form onSubmit={formControl.handleSubmit(onSubmit)}>
                            <div className={s.shopStorageModal_inputFields}>
                                <ControlledCustomInput name={'name'}
                                                       placeholder={'Название опции'}
                                                       control={formControl}
                                                       rules={{required: Errors[0].name}}
                                />
                                <ControlledCustomCheckbox name={'enabled'}
                                                          label={'Опция включена'}
                                                          control={formControl}
                                                          divClassName={s.infoBlock_checkbox}
                                />
                                <Button buttonDivWrapper={s.infoBlock_cancelBtn}
                                        disabled={currentOption === null}
                                        onClick={() => {setCurrentOption(null)}}
                                >
                                    Отмена
                                </Button>
                            </div>
                            <div className={s.footer_buttons}>
                                <Button type={'submit'}>
                                    {currentOption === null ? 'Создать опцию' : 'Обновить опцию'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </CustomModal>
        )
    }
}