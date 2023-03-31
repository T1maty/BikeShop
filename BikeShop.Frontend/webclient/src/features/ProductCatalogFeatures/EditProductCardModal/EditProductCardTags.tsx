import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import useEditProductCardModal from './EditProductCardModalStore'
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

    const productTags = useEditProductCardModal(s => s.productTags)
    const setProductTags = useEditProductCardModal(s => s.setProductTags)

    const [open, setOpen] = useState(false)

    // тестовые данные
    // const [productTags, setProductTags] = useState([
    //     {id: 1, name: 'htt50/150/'},
    //     {id: 2, name: 'htt250/150/'},
    //     {id: 3, name: 'ht/150/'},
    //     {id: 4, name: 'http/1018/250/150/'},
    //     {id: 5, name: 'https/1015/250/150/'},
    //     {id: 6, name: 'https/1015/250/150/'},
    //     {id: 7, name: 'https/1015/250/150/'},
    // ])

    const addTagHandler = () => {
        setOpen(true)
    }

    const deleteTagHandler = (tagId: number) => {
        setProductTags(productTags.filter(tag => tag.id !== tagId))
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
                            productTags.length === 0 ? <div className={s.tagList_noTags}>Тегов нет</div> :
                                productTags.map((tag: ProductTagForCard) => {
                                    return (
                                        <div key={tag.id} className={s.tagList_item}>
                                            <div className={s.tagList_itemTitle}>{tag.name}</div>
                                            <div>
                                                <img src={RemoveIcon} alt="remove-icon"
                                                     className={s.tagList_deleteItem}
                                                     onClick={() => {
                                                         deleteTagHandler(tag.id)
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