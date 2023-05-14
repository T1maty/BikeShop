import React, {useEffect, useState} from 'react'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm, Controller} from 'react-hook-form'
import s from '../CreateOptionModal/CreateOptionModal.module.scss'
import {Button, ControlledCustomInput, CustomModal,
    EditableSpan, LoaderScreen, CustomInput} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'
import useCreateOptionModal from './CreateOptionModalStore'
import RemoveIcon from '../../../shared/assets/workspace/remove-icon.svg'
import {ProductOptionVariant, UpdateOption} from '../../../entities'

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

    const [optionVariantName, setOptionVariantName] = useState<string>('')

    const formControl = useForm<UpdateOption>({
        defaultValues: {
            id: 0,
            name: '',
            optionVariants: [],
        }
    })

    const onSubmit: SubmitHandler<UpdateOption> = (data: any) => {
        if (currentOption === null) {
            data.optionVariants = [...data.optionVariants, optionVariantName]
            setOptionVariantName('')
            addNewOption(data)
        }
        if (currentOption !== null) {
            data.enabled = true
            updateOption(data)
        }
    }

    // добавление варианта опции при обновлении
    const addOptionVariantHandler = () => {
        setCurrentOption({
            ...currentOption!,
            optionVariants: [...currentOption!.optionVariants, {
                id: 0,
                name: optionVariantName,
                optionId: currentOption!.id,
                optionName: currentOption!.name,
                createdAt: '',
                updatedAt: '',
                enabled: true
            }]
        })
        setOptionVariantName('')
    }

    // удаление варианта опции
    const deleteOptionVariantHandler = (optVar: ProductOptionVariant) => {
        setCurrentOption({
            ...currentOption!,
            optionVariants: currentOption!.optionVariants.filter((ov: ProductOptionVariant) => ov.id !== optVar.id)
        })
    }

    // редактирование варианта опции
    const onChangeOptionVariantHandler = (newInputValue: string, field: any, optVar: ProductOptionVariant) => {
        field.onChange(field.value.map((ov: ProductOptionVariant) => ov.id === optVar.id ?
            {...ov, name: newInputValue} : ov))
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentOption ? currentOption.id : 0)
        formControl.setValue('name', currentOption ? currentOption.name : '')
        // @ts-ignore
        formControl.setValue('optionVariants', currentOption ? currentOption.optionVariants : [])
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
        open && getOptions()
    }, [])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {

        return (
            <CustomModal
                open={open}
                onClose={() => {setOpen(false)}}
            >
                <div className={s.optionModal_mainBlock}>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>
                        <div className={s.optionModal_createOption}>
                            <fieldset className={s.createOption_box}>
                                <legend>Создать опцию</legend>
                                <div className={s.optionName_row}>
                                    <ControlledCustomInput name={'name'}
                                                           placeholder={'Название новой опции'}
                                                           divClassName={s.optionName_rowInput}
                                                           control={formControl}
                                                           rules={{required: Errors[0].name}}
                                    />
                                </div>
                                <div className={s.optionVariantName_row}>
                                    <Button onClick={addOptionVariantHandler}
                                            disabled={currentOption === null}
                                    >
                                        +
                                    </Button>
                                    <CustomInput value={optionVariantName}
                                                 onChange={(e) => {setOptionVariantName(e.currentTarget.value)}}
                                                 placeholder={'Название варианта опции'}
                                                 divClassName={s.optionVariantName_rowInput}
                                    />
                                </div>

                                <Controller
                                    name={'optionVariants'}
                                    control={formControl.control}
                                    render={({field}: any) =>
                                        <div className={s.optionVariant_list}>
                                            {
                                                field.value === null ?
                                                    <div className={s.optionVariant_emptyList}>
                                                        Список опций пуст
                                                    </div> :

                                                    field.value.map((optVar: ProductOptionVariant) => {
                                                        return (
                                                            <div className={s.optionVariant_item} key={optVar.id}>
                                                                <div className={s.item_text}>
                                                                    <EditableSpan title={optVar.name}
                                                                                  onChangeInput={(newInputValue) => {
                                                                                      onChangeOptionVariantHandler(newInputValue, field, optVar)
                                                                                  }}
                                                                                  inputClassName={s.inputClassName}
                                                                                  spanClassName={s.spanClassName}
                                                                    />
                                                                </div>
                                                                <div className={s.item_delete}>
                                                                    <img src={RemoveIcon} alt="remove-icon"
                                                                         onClick={() => {deleteOptionVariantHandler(optVar)}}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                            }
                                        </div>
                                    }
                                />

                                <div className={s.createOption_buttonsBlock}>
                                    <Button buttonDivWrapper={s.buttonsBlock_cancelButton}
                                            disabled={currentOption === null}
                                            onClick={() => {setCurrentOption(null)}}
                                    >
                                        Отмена
                                    </Button>
                                    <Button type={'submit'}
                                            buttonDivWrapper={s.buttonsBlock_createButton}
                                            disabled={currentOption === null && optionVariantName.length === 0
                                                || currentOption !== null && currentOption.optionVariants.length === 0
                                            }
                                    >
                                        {currentOption === null ? 'Создать опцию' : 'Обновить опцию'}
                                    </Button>
                                </div>
                            </fieldset>
                        </div>
                    </form>

                    <div className={s.optionModal_options}>
                        <div className={s.options_title}>Список доступных опций</div>
                        <div className={s.optionModal_optionsList}>
                            {
                                options.map((option) => {
                                    return (
                                        <div key={option.id}
                                             className={option.id === currentOption?.id ?
                                             s.optionFieldset_wrapper_active : s.optionFieldset_wrapper}
                                             onDoubleClick={() => {setCurrentOption(option)}}
                                        >
                                            <fieldset className={s.optionsList_item}>
                                                <legend>{option.name}</legend>
                                                <div className={s.optionsList_VariantsList}
                                                     // onClick={() => {setCurrentOption(option)}}
                                                >
                                                    {
                                                        option.optionVariants.map((ov) => {
                                                            return (
                                                                <div className={s.variant_item} key={ov.id}>
                                                                    {ov.name}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className={s.optionsList_deleteList}>
                                                    <img src={RemoveIcon} alt="remove-icon" onClick={() => {}}/>
                                                </div>
                                            </fieldset>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </CustomModal>
        )
    }
}