import React from 'react'
import s from './ProductCatalogTable.module.scss'
import ProductCatalogTableRow from "./ProductCatalogTableRow";
import useCardCatalogStore from "../../../../pages/workspace/CardCatalog/CardCatalogStore";
import {EditProductCardModal} from "../../../../features";
import {Loader} from "../../../../shared/ui/Loader/Loader";


export const ProductCatalogTable = () => {
    const catalogState = useCardCatalogStore(s => s.catalogState)
    const updateItem = useCardCatalogStore(s => s.updateItem)
    const isLoading = useCardCatalogStore(s => s.isLoading)

    if (isLoading) return (
        <div className={s.wrapper} style={{display: "flex", justifyContent: "center"}}><Loader
            variant={"ellipsis"}/>
        </div>)
    return (
        <div className={s.wrapper}>
            <EditProductCardModal onUpd={updateItem}/>
            {catalogState?.products.map((product, index) => <ProductCatalogTableRow key={index} product={product}/>)}
        </div>
    )

}