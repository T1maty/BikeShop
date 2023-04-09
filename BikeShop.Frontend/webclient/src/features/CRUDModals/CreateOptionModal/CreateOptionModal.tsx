import React, {useEffect} from 'react'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import s from '../CreateOptionModal/CreateOptionModal.module.scss'
import {
    Button, ControlledCustomCheckbox, ControlledCustomInput,
    CustomModal, EditableSpan, LoaderScreen
} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'
import useCreateOptionModal from './CreateOptionModalStore'
import RemoveIcon from '../../../shared/assets/workspace/remove-icon.svg'
import {ProductOptionVariant} from "../../../entities"
import {
    ProductOptionsWithVariants
} from '../../ProductCatalogFeatures/EditProductCardModal/models/ProductOptionsWithVariants';

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

    const formControl = useForm<any>({
        defaultValues: {
            id: 0, // ИД опции
            name: '', // название опции
            variantName: '', // инпут для ввода названия варианта опции
            optionVariants: [], // массив строк с названием вариантов опции
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        if (currentOption === null) {
            addNewOption(data)
        }
        if (currentOption !== null) {
            console.log('submit data', data)
            data.enabled = true
            updateOption(data)
        }
    }

    const deleteOptionHandler = (optVar: ProductOptionVariant) => {
        setCurrentOption({...currentOption!,
            optionVariants: currentOption!.optionVariants.filter((ov: ProductOptionVariant) => ov.id !== optVar.id)})
    }

    const addOptionVariantHandler = () => {
        formControl.setValue('optionVariants', 'variantName')
        formControl.reset(formControl.resetField('variantName'))
        console.log(formControl.control)
    }

    useEffect(() => {
        formControl.reset()
        formControl.setValue('id', currentOption ? currentOption.id : 0)
        formControl.setValue('name', currentOption ? currentOption.name : '')
        // formControl.setValue('variantName', currentOption ? currentOption.variantName : '')
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
                                    <Button // buttonDivWrapper={s.options_button}
                                            onClick={addOptionVariantHandler}
                                            // disabled={selectedSpecification === undefined}
                                    >
                                        +
                                    </Button>
                                    <ControlledCustomInput name={'variantName'}
                                                           placeholder={'Название варианта опции'}
                                                           divClassName={s.optionVariantName_rowInput}
                                                           control={formControl}
                                                           // rules={{required: Errors[0].name}}
                                    />
                                </div>
                                <div className={s.optionVariant_list}>
                                    {
                                        currentOption === null ?
                                            <div className={s.optionVariant_emptyList}>
                                                Список опций пуст
                                            </div> :

                                            currentOption.optionVariants.map(optVar => {
                                                return (
                                                    <div className={s.optionVariant_item} key={optVar.id}>
                                                        <div className={s.item_text}>
                                                            {optVar.name}
                                                        </div>
                                                        <div className={s.item_delete}>
                                                            <img src={RemoveIcon} alt="remove-icon"
                                                                 onClick={() => {deleteOptionHandler(optVar)}}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                                <div className={s.createOption_buttonsBlock}>
                                    <Button buttonDivWrapper={s.buttonsBlock_cancelButton}
                                            disabled={currentOption === null}
                                            onClick={() => {setCurrentOption(null)}}
                                    >
                                        Отмена
                                    </Button>
                                    <Button type={'submit'}
                                            buttonDivWrapper={s.buttonsBlock_createButton}
                                        // onClick={() => {editSpecificationHandler(field)}}
                                        // disabled={selectedSpecification === undefined}
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
                                        <div className={option.id === currentOption?.id ?
                                                        s.optionFieldset_wrapper_active : s.optionFieldset_wrapper}
                                             onClick={() => {setCurrentOption(option)}}
                                        >
                                            <fieldset className={s.optionsList_item} key={option.id}

                                            >
                                                <legend>{option.name}</legend>
                                                <div className={s.optionsList_VariantsList}>
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

// <div className={s.createSpecificationModal_mainBlock}>
//
//     <div className={s.specificationModal_specifications}>
//         <div className={s.specifications_specificationsList}>
//
//             {options.map(spec => (
//                 <div key={spec.id}
//                      className={spec.id === currentOption?.id ? s.shop_item_active : s.shop_item}
//                      onClick={() => {
//                          setCurrentOption(spec)
//                      }}
//                 >
//                     <div><span>ID:</span> {spec.id}</div>
//                     <div><span>Название:</span> {spec.name}</div>
//                     <div><span>Активен:</span> {spec.enabled ? 'Да' : 'Нет'}</div>
//                 </div>
//             ))}
//
//         </div>
//     </div>
//
//     <div className={s.specificationModal_createBlock}>
//         <form onSubmit={formControl.handleSubmit(onSubmit)}>
//             <div className={s.shopStorageModal_inputFields}>
//                 <ControlledCustomInput name={'name'}
//                                        placeholder={'Название опции'}
//                                        control={formControl}
//                                        rules={{required: Errors[0].name}}
//                 />
//                 <ControlledCustomCheckbox name={'enabled'}
//                                           label={'Опция включена'}
//                                           control={formControl}
//                                           divClassName={s.infoBlock_checkbox}
//                 />
//                 <Button buttonDivWrapper={s.infoBlock_cancelBtn}
//                         disabled={currentOption === null}
//                         onClick={() => {setCurrentOption(null)}}
//                 >
//                     Отмена
//                 </Button>
//             </div>
//             <div className={s.footer_buttons}>
//                 <Button type={'submit'}>
//                     {currentOption === null ? 'Создать опцию' : 'Обновить опцию'}
//                 </Button>
//             </div>
//         </form>
//     </div>
// </div>