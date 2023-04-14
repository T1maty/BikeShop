import React from 'react'
import s from "./ProductTagCloud.module.scss"
import {Button} from "../../../../shared/ui"
import {ProductTag} from "../../../../entities"

interface ProductTagCloudProps {
    tags: ProductTag[]
    setTags: (value: ProductTag[]) => void
}

export const ProductTagCloud = (props: ProductTagCloudProps) => {

    return (
        <div className={s.productTagCloud}>
            <div className={s.productTagCloud_header}>
                <div>Облако тегов</div>
                <Button onClick={() => {props.setTags([])}}>
                    Очистить
                </Button>
            </div>
            <div className={s.productTagCloud_tagsList}>
                {
                    props.tags.map((n) => {
                        return (
                            <div className={s.tagsList_item}
                                 onDoubleClick={() => {props.setTags(props.tags.filter(n1 => n1.id != n.id))}}
                            >
                                {n.name}
                            </div>)
                    })
                }
            </div>
        </div>
    )
}