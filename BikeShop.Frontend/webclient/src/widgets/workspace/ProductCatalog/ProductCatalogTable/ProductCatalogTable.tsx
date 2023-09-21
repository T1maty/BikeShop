import React from 'react'
import s from './ProductCatalogTable.module.scss'
import ProductCatalogTableRow from "./ProductCatalogTableRow";
import useCardCatalogStore from "../../../../pages/workspace/CardCatalog/CardCatalogStore";
import {EditProductCardModal} from "../../../../features";


export const ProductCatalogTable = () => {
    const catalogState = useCardCatalogStore(s => s.catalogState)
    const updateItem = useCardCatalogStore(s => s.updateItem)

    return (
        <div className={s.wrapper}>
            <EditProductCardModal onUpd={updateItem}/>
            {catalogState?.products.map((product, index) => <ProductCatalogTableRow key={index} product={product}/>)}
        </div>
    )

}