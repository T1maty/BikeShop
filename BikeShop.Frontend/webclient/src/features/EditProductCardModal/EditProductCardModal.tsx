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
        {id: '1', name: 'option1'},
        {id: '2', name: 'option2'},
        {id: '3', name: 'option3'},
    ])

    const formControl = useForm<any>({
        defaultValues: {
            option: '',
            details: '',
        }
    })

    return (
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
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
                        <div className={s.productOptions_options}>
                            <fieldset className={s.options_box}>
                                <legend>Название опции</legend>
                                <div className={s.options_rowItems}>
                                    <div>Вариант опции</div>
                                    <div className={s.options_chooseItem}>
                                        <Button buttonDivWrapper={s.options_button}>+</Button>
                                        <ControlledSelect control={formControl} name={'option'} label={'Опция'}
                                                          className={s.options_select}
                                                          data={options.map((el) => {
                                                              return {id: el.id, value: el.name ? el.name : 'Нет опции'}
                                                          })}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div className={s.productOptions_select}>
                            <div className={s.options_chooseItem}>
                                <Button buttonDivWrapper={s.options_button}>+</Button>
                                <ControlledSelect control={formControl} name={'option'} label={'Опция'}
                                                  className={s.options_select}
                                                  data={options.map((el) => {
                                                      return {id: el.id, value: el.name ? el.name : 'Нет опции'}
                                                  })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={s.rightSide_productDetails}>
                        <div className={s.productOptions_options}>
                            <fieldset className={s.options_box}>
                                <legend>Характеристика</legend>
                                <div className={s.options_rowItems}>
                                    <div>Описание</div>
                                </div>
                            </fieldset>
                        </div>
                        <div className={s.productOptions_select}>
                            <div className={s.options_chooseItem}>
                                <Button buttonDivWrapper={s.options_button}>+</Button>
                                <ControlledInput name={'details'}
                                                 label={'Характеристика'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                                 divClassName={s.options_textFiled}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}