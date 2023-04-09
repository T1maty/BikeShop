import React from 'react'
import {Button} from "../../../../shared/ui"
import s from "./ProductTagItem.module.scss";
import {ProductTag} from "../../../../entities";

interface props {
    tags: ProductTag[],
    setTags: (value: ProductTag[]) => void
}

export const ProductTagCloud = (props: props) => {


    return (
        <div>
            <span>Облако тегов</span>

            <Button onClick={() => {
                props.setTags([])
            }}>
                Очистить
            </Button>

            {
                props.tags.map((n) => {
                    return (
                        <div className={s.item}
                             onDoubleClick={() => {
                                 props.setTags(props.tags.filter(n1 => n1.id != n.id))
                             }}
                        >
                            {n.name}
                        </div>)
                })
            }
        </div>
    )
}

