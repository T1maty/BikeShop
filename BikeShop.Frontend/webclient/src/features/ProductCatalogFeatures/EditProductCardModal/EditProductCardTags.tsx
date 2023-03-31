import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import {ProductTagForCard} from '../../../entities'
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import {Button} from "../../../shared/ui"
import {AddProductCardTagModal} from "../AddProductCardTagModal/AddProductCardTagModal"
import {Controller, UseFormReturn} from "react-hook-form"

interface ControlledProps {
    name: string
    control: UseFormReturn<any>
}

export const EditProductCardTags = (props: ControlledProps) => {

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
                        <AddProductCardTagModal setOpen={setOpen} open={open}/>
                    </div>
                    <div className={s.tagEditor_tags}>
                        {
                            field.value.length === 0 ? <div className={s.tagList_noTags}>Тегов нет</div> :
                                field.value.map((tag: ProductTagForCard) => {
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