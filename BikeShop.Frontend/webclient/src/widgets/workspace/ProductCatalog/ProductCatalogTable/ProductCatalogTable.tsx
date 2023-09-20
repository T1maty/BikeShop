import React from 'react'
import s from './ProductCatalogTable.module.scss'
import ProductCatalogTableRow from "./ProductCatalogTableRow";
import useCardCatalogStore from "../../../../pages/workspace/CardCatalog/CardCatalogStore";
import {EditProductCardModal} from "../../../../features";


export const ProductCatalogTable = () => {
    const catalogState = useCardCatalogStore(s => s.catalogState)

    return (
        <div className={s.wrapper}>
            <EditProductCardModal/>
            {catalogState?.products.map((product, index) => <ProductCatalogTableRow key={index} product={product}/>)}
        </div>
    )

}