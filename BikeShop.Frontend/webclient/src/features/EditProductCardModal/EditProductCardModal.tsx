import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import {Modal} from "@mui/material"
import useEditProductCardModal from "./EditProductCardModalStore"
import {Button, ControlledInput, ControlledSelect} from "../../shared/ui"
import {useForm} from "react-hook-form"
import {Errors} from "../../entities/errors/workspaceErrors";

export const EditProductCardModal = () => {

    const open = useEditProductCardModal(s => s.openEditProductCardModal)
    const setOpen = useEditProductCardModal(s => s.setOpenEditProductCardModal)

    const [options, setOptions] = useState([
        {id: '1', name: 'Размер шлема', options: ['S', 'M', 'L']},
        {id: '2', name: 'Цвет шлема', options: []},
    ])

    const [details, setDetails] = useState([
        {id: '1', name: 'Характеристика 1', description: 'Описание 1'},
        {id: '2', name: 'Характеристика 2', description: 'Описание 2'},
        {id: '3', name: 'Характеристика 3', description: 'Описание 3'},
    ])

    const formControl = useForm<any>({
        defaultValues: {
            option: '',
            details: '',
        }
    })

    const deleteOptionsListHandler = (detailsItem: any) => {
        setDetails(details.filter(el => el.id !== detailsItem.id))
    }

    const deleteDetailsListHandler = (detailsItem: any) => {
        setDetails(details.filter(el => el.id !== detailsItem.id))
    }

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.editProductCardModal_mainBlock}>
                <div className={s.editProductCardModal_leftSide}>
                    <div className={s.leftSide_imageGallery}>Фотографии</div>
                    <div className={s.leftSide_descriptionEditor}>
                        <div className={s.descriptionEditor_title}>Описание товара:</div>
                        <div className={s.descriptionEditor_textarea}>
                            <textarea/>
                        </div>
                    </div>
                </div>

                <div className={s.editProductCardModal_rightSide}>
                    <div className={s.rightSide_tagEditor}>
                        <div className={s.tagEditor_title}>Редактор тегов товара</div>
                        <div className={s.tagEditor_tags}>Здесь будут теги</div>

                    </div>

                    <div className={s.rightSide_productOptions}>
                        <div className={s.productOptions_optionsList}>
                            {
                                options.map(opt => {
                                    return (
                                        <div className={s.optionsList_item} key={opt.id}>
                                            <fieldset className={s.options_box}>
                                                <legend>{opt.name}</legend>
                                                <div className={s.options_rowItems}>
                                                    <div className={s.rowItems_item}>
                                                        <div className={s.item_deleteFullItem}>Удалить</div>
                                                        {
                                                            opt.options.map(el => {
                                                                return (
                                                                    <div className={s.item_content}>
                                                                        <div className={s.item_title}>{el}</div>
                                                                        <div className={s.item_delete}>X</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className={s.rowItems_chooseItem}>
                                                        <Button buttonDivWrapper={s.options_button}>+</Button>
                                                        <ControlledSelect control={formControl} name={'option'} label={'Опция'}
                                                                          className={s.options_search}
                                                                          data={options.map((el) => {
                                                                              return {
                                                                                  id: el.id,
                                                                                  value: el.name ? el.name : 'Нет опции'
                                                                              }
                                                                          })}
                                                        />
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={s.productOptions_selectRow}>
                            <Button buttonDivWrapper={s.options_button}>+</Button>
                            <ControlledSelect control={formControl} name={'option'} label={'Опция'}
                                              className={s.options_search}
                                              data={options.map((el) => {
                                                  return {id: el.id, value: el.name ? el.name : 'Нет опции'}
                                              })}
                            />
                        </div>
                    </div>


                    <div className={s.rightSide_productDetails}>
                        <div className={s.productOptions_optionsList}>
                            {
                                details.map(det => {
                                    return (
                                        <div className={s.optionsList_item} key={det.id}>
                                            <fieldset className={s.options_box}>
                                                <legend>{det.name}</legend>
                                                <div className={s.options_rowItems}>
                                                    <div className={s.rowItems_item}>
                                                        <div className={s.item_deleteFullItem}
                                                             onClick={() => deleteDetailsListHandler(det)}
                                                        >
                                                            Удалить
                                                        </div>
                                                        <div className={s.item_content}>
                                                            {det.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={s.productOptions_selectRow}>
                            <Button buttonDivWrapper={s.options_button}>+</Button>
                            <ControlledInput name={'details'}
                                             label={'Характеристика'}
                                             control={formControl}
                                             rules={{required: Errors[0].name}}
                                             divClassName={s.options_search}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </Modal>
    )
}