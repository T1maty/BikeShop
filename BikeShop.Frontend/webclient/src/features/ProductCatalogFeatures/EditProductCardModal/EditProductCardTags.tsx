import React from 'react'
import s from "./EditProductCardModal.module.scss"
import useEditProductCardModal from './EditProductCardModalStore'
import {ProductTags} from '../../../entities'

export const EditProductCardTags = () => {

    const currentProduct = useEditProductCardModal(s => s.currentProduct)

    return (
        <div className={s.rightSide_tagEditor}>
            <div className={s.tagEditor_title}>Редактор тегов товара</div>
            <div className={s.tagEditor_tags}>
                {
                    // currentProduct.productTags.length === 0 ? <div>Тегов нет</div> :
                        currentProduct.productTags.map((tag: ProductTags) => {
                        return (
                            <div key={tag.id}>{tag.name}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}