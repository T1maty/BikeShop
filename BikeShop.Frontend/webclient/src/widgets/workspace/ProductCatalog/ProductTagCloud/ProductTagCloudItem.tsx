import React from 'react';
import {ProductTag} from "../../../../entities";
import s from './ProductTagItem.module.scss'
import useProductTagCloudStore from "./ProductTagCloudStore";

interface props {
    tag: ProductTag
}

export const ProductTagCloudItem = (props: props) => {
    const remove = useProductTagCloudStore(s => s.removeTag)
    return (
        <div className={s.item} onDoubleClick={() => {
            remove(props.tag.id)
        }}>
            {props.tag.name}
        </div>
    );
};

