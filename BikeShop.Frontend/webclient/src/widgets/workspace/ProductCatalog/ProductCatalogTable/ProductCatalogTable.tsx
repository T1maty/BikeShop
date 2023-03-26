import React from 'react'
import {CreateProductModal, UpdateProductModal} from '../../../../features'
import {ProductCatalogTableContextMenu} from './ProductCatalogTableContextMenu'
import useProductCatalogTableStore from './ProductCatalogTableStore'
import s from "../../../../pages/workspace/ProductCatalog/ProductCatalog.module.scss"
import {IProduct, IProductExtended} from "../../../../entities"
import {
    EditProductCardModal
} from '../../../../features/ProductCatalogFeatures/EditProductCardModal/ui/EditProductCardModal'
import {UniTable} from "../../../../shared/ui"
import {columns} from "./ProductCatalogTableConfig"

interface props {
    onRowDoubleClick?: (product: any) => void
}

export const ProductCatalogTable = (props: props) => {

    const rows = useProductCatalogTableStore(s => s.rows)
    const updateRow = useProductCatalogTableStore(s => s.updateRow)
    const addNewProduct = useProductCatalogTableStore(s => s.addNewProduct)
    const setContextVisible = useProductCatalogTableStore(s => s.setOpen)
    const isLoading = useProductCatalogTableStore(s => s.isLoading)

    const createProductSuccessHandler = (product: IProduct) => {
        let extProd: IProductExtended;
        extProd = {} as IProductExtended
        extProd.product = product
        extProd.quantity = 0
        addNewProduct(extProd)
    }

    let data = rows.map((item) => {
        return {
            ...item.product,
            quantity: item.quantity,
            quantityUnitName: item.quantityUnit?.name ? item.quantityUnit?.name : "Error"
        }
    })

    return (
        <>
            <ProductCatalogTableContextMenu/>
            <CreateProductModal onSuccess={createProductSuccessHandler}/>
            <UpdateProductModal onSuccess={updateRow}/>
            <EditProductCardModal productCardData={'Здесь будут теги!'}/>

            <div className={s.table_content}>
                <UniTable rows={data}
                          columns={columns}
                          rowOnDoubleClick={(row, event) => {
                              props.onRowDoubleClick ? props.onRowDoubleClick(row) : true
                          }}
                          rowOnContext={(row, event) => {
                              setContextVisible(true, event.clientX, event.clientY)
                          }}
                          isLoading={isLoading}
                />
            </div>
        </>
    )
}