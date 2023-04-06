import React from 'react'
import {ProductTagCloudItem} from "./ProductTagCloudItem"
import useProductTagCloudStore from "./ProductTagCloudStore"
import {Button} from "../../../../shared/ui"

export const ProductTagCloud = () => {

    const tags = useProductTagCloudStore(s => s.tags)
    const clearTags = useProductTagCloudStore(s => s.clearTags)

    return (
        <div>
            <span>Облако тегов</span>

            <Button onClick={() => {clearTags()}}>
                Очистить
            </Button>

            {
                tags.map((n) => {
                    return (<ProductTagCloudItem key={n.id} tag={n}/>)
                })
            }
        </div>
    )
}

