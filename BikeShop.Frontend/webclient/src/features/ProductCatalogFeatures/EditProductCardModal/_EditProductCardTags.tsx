import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import {Button} from "../../../shared/ui"
import {ChooseProductTagModal} from "../ChooseProductTagModal/ChooseProductTagModal"
import {Controller, UseFormReturn} from "react-hook-form"
import {ProductTag} from "../../../entities"
import {useSnackbar} from "notistack"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
}

export const _EditProductCardTags = (props: ControlledProps) => {

    const {enqueueSnackbar} = useSnackbar()
    const [open, setOpen] = useState(false)

    const addTagHandler = () => {
        setOpen(true)
    }

    return (
        <Controller
            name={props.name}
            control={props.control.control}
            render={({field}: any) =>

                <div className={s.rightSide_tagEditor}>
                    <div className={s.tagEditor_header}>
                        <div className={s.header_title}>Редактор тегов товара</div>
                        <Button buttonDivWrapper={s.header_addButton}
                                onClick={addTagHandler}
                        >
                            Добавить тег
                        </Button>
                        <ChooseProductTagModal setOpen={setOpen} open={open} onTagDoubleClick={(tag) => {
                            if (field.value.find((n: ProductTag) => n.id === tag.id) === undefined) {
                                field.onChange([...field.value, tag])
                                setOpen(false)
                            } else {
                                enqueueSnackbar('Такой тег уже есть у товара', {
                                    variant: 'warning',
                                    autoHideDuration: 3000
                                })
                            }
                        }
                        }/>
                    </div>
                    <div className={s.tagEditor_tags}>
                        {
                            field.value.length === 0 ? <div className={s.tagList_noTags}>Тегов нет</div> :
                                field.value.map((tag: ProductTag) => {
                                    return (
                                        <div key={tag.id} className={s.tagList_item}>
                                            <div className={s.tagList_itemTitle}>{tag.name}</div>
                                            <div>
                                                <img src={RemoveIcon} alt="remove-icon"
                                                     className={s.tagList_deleteItem}
                                                     onClick={() => {
                                                         field.onChange(field.value.filter((t: any) => t.id !== tag.id))
                                                     }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>

            }
        />
    )
}