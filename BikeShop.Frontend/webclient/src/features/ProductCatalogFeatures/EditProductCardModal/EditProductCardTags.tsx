import React, {useState} from 'react'
import s from "./EditProductCardModal.module.scss"
import useEditProductCardModal from './EditProductCardModalStore'
import {ProductTagForCard} from '../../../entities'
import RemoveIcon from "../../../shared/assets/workspace/remove-icon.svg"
import {Button} from "../../../shared/ui"
import useAddProductCardTagModal from "../AddProductCardTagModal/AddProductCardTagModalStore"
import {AddProductCardTagModal} from "../AddProductCardTagModal/AddProductCardTagModal"

export const EditProductCardTags = () => {

    const setOpenAddProductCardTagModal = useAddProductCardTagModal(s => s.setOpenAddProductCardTagModal)

    const currentProduct = useEditProductCardModal(s => s.currentProduct)
    const productTags = useEditProductCardModal(s => s.productTags)
    const setProductTags = useEditProductCardModal(s => s.setProductTags)

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
        setOpenAddProductCardTagModal(true)
    }

    const deleteTagHandler = (tagId: number) => {
        setProductTags(productTags.filter(tag => tag.id !== tagId))
    }

    return (
        <div className={s.rightSide_tagEditor}>
            <div className={s.tagEditor_header}>
                <div className={s.header_title}>Редактор тегов товара</div>
                <Button buttonDivWrapper={s.header_addButton}
                        onClick={addTagHandler}
                >
                    Добавить тег
                </Button>
                <AddProductCardTagModal/>
            </div>
            <div className={s.tagEditor_tags}>
                {
                    productTags.length === 0 ? <div>Тегов нет</div> :
                        productTags.map((tag: ProductTagForCard) => {
                            return (
                                <div key={tag.id} className={s.tagList_item}>
                                    <div className={s.tagList_itemTitle}>{tag.name}</div>
                                    <div>
                                        <img src={RemoveIcon} alt="remove-icon"
                                             className={s.tagList_deleteItem}
                                             onClick={() => {deleteTagHandler(tag.id)}}
                                        />
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}