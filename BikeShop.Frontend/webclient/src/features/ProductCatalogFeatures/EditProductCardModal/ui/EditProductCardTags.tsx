import React from 'react'
import s from "./EditProductCardModal.module.scss"

export const EditProductCardTags = (props: { productCardData?: any }) => {
    return (
        <div className={s.rightSide_tagEditor}>
            <div className={s.tagEditor_title}>Редактор тегов товара</div>
            <div className={s.tagEditor_tags}>{props.productCardData}</div>
        </div>
    )
}