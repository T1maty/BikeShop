import React from 'react'
import s from './ProductTagItem.module.scss'
import {ProductTag} from "../../../../entities"
import useProductTagCloudStore from "./ProductTagCloudStore"

interface ProductTagCloudItemProps {
    tag: ProductTag
}

export const ProductTagCloudItem = (props: ProductTagCloudItemProps) => {

    const remove = useProductTagCloudStore(s => s.removeTag)

    return (
        <div className={s.item}
             onDoubleClick={() => {remove(props.tag.id)}}
        >
            {props.tag.name}
        </div>
    )
}