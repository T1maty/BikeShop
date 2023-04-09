import React, {useEffect} from 'react'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm} from 'react-hook-form'
import s from '../CreateOptionModal/CreateOptionModal.module.scss'
import {Button, ControlledCustomCheckbox, ControlledCustomInput,
    CustomModal, EditableSpan, LoaderScreen} from '../../../shared/ui'
import {Errors} from '../../../entities/errors/workspaceErrors'
import useCreateOptionModal from './CreateOptionModalStore'
import RemoveIcon from '../../../shared/assets/workspace/remove-icon.svg'

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
            name: '', // название опции
            variantNames: [], // массив строк с названием вариантов опции
        }
    })

    const onSubmit: SubmitHandler<any> = (data: any) => {
        if (currentOption === null) {
            addNewOption(data.name)
        }
        if (currentOption !== null) {
            updateOption(data)
        }
    }

    const variants = ['белый', 'синий', 'красный', 'зелёный', 'жёлтый', 'чёрный',
        'белый', 'синий', 'красный', 'зелёный', 'жёлтый', 'чёрный'
    ]

    // const result = [
    //     {name: 'цвет', variants: [{id: 1, title: 'белый'}, {id: 2, title: 'красный'}, {id: 3, title: 'синий'},
    //             {id: 4, title: 'синий'}, {id: 5, title: 'синий'}, {id: 6, title: 'синий'},
    //             {id: 7, title: 'синий'}, {id: 8, title: 'синий'}, {id: 9, title: 'синий'}]},
    //     {name: 'размер', variants: [{id: 1, title: 'S'}, {id: 2, title: 'M'}, {id: 3, title: 'L'}]},
    //     {name: 'диаметр', variants: [{id: 1, title: '24'}, {id: 2, title: '26'}, {id: 3, title: '29'}]},
    //     {name: 'диаметр', variants: [{id: 1, title: '24'}, {id: 2, title: '26'}, {id: 3, title: '29'},
    //             {id: 4, title: '29'}, {id: 5, title: '29'}, {id: 6, title: '29'}]},
    // ]

    useEffect(() => {
        formControl.reset()
        // formControl.setValue('id', currentOption ? currentOption.id : 0)
        // formControl.setValue('name', currentOption ? currentOption.name : '')
        // formControl.setValue('variantNames', currentOption ? currentOption.variantNames : [])
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
                    <div className={s.optionModal_createOption}>
                        <fieldset className={s.createOption_box}>
                            <legend>Создать опцию</legend>
                            <div className={s.optionName_row}>
                                <Button // buttonDivWrapper={s.options_button}
                                        // onClick={() => {editSpecificationHandler(field)}}
                                        // disabled={selectedSpecification === undefined}
                                >
                                    +
                                </Button>
                                <ControlledCustomInput name={'optionName'}
                                                       placeholder={'Название новой опции'}
                                                       divClassName={s.optionName_rowInput}
                                                       control={formControl}
                                                       // rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div className={s.optionVariantName_row}>
                                <Button // buttonDivWrapper={s.options_button}
                                        // onClick={() => {editSpecificationHandler(field)}}
                                        // disabled={selectedSpecification === undefined}
                                >
                                    +
                                </Button>
                                <ControlledCustomInput name={'optionVariantName'}
                                                       placeholder={'Название варианта опции'}
                                                       divClassName={s.optionVariantName_rowInput}
                                                       control={formControl}
                                                       // rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div className={s.optionVariant_list}>
                                {
                                    variants.map((v) => {
                                        return (
                                            <div className={s.optionVariant_item} key={v}>
                                                <div className={s.item_text}>
                                                    {v}
                                                </div>
                                                <div className={s.item_delete}>
                                                    <img src={RemoveIcon} alt="remove-icon"
                                                         // onClick={() => {deleteSpecificationHandler(field, spec)}}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </fieldset>
                    </div>


                    <div className={s.optionModal_options}>
                        <div className={s.options_title}>Список доступных опций</div>
                        <div className={s.optionModal_optionsList}>
                            {
                                options.map((option) => {
                                    return (
                                        <fieldset className={s.optionsList_item} key={option.id}>
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