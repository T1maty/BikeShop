import React from 'react'
import {CreateProductModal, UpdateProductModal} from '../../../../features'
import {ProductCatalogTableContextMenu} from './ProductCatalogTableContextMenu'
import useProductCatalogTableStore from './ProductCatalogTableStore'
import s from "../../../../pages/workspace/ProductCatalog/ProductCatalog.module.scss"
import {Product, ProductExtended} from "../../../../entities"
import {UniTable} from "../../../../shared/ui"
import {columns} from "./ProductCatalogTableConfig"

interface CatalogTableProps {
    onRowDoubleClick?: (product: any) => void
}

export const ProductCatalogTable = (props: CatalogTableProps) => {

    const rows = useProductCatalogTableStore(s => s.rows)
    const updateRow = useProductCatalogTableStore(s => s.updateRow)
    const addNewProduct = useProductCatalogTableStore(s => s.addNewProduct)
    const setContextVisible = useProductCatalogTableStore(s => s.setOpen)
    const isLoading = useProductCatalogTableStore(s => s.isLoading)

    const createProductSuccessHandler = (product: Product) => {
        let extProd: ProductExtended
        extProd = {} as ProductExtended
        extProd.product = product
        extProd.quantity = 0
        addNewProduct(extProd)
    }

    let data = rows.map((item) => {
        return {
            ...item.product,
            quantity: item.quantity,
            quantityUnitName: item.quantityUnit?.name ? item.quantityUnit?.name : 'Error'
        }
    })

    return (
        <>
            <ProductCatalogTableContextMenu/>
            <CreateProductModal onSuccess={createProductSuccessHandler}/>
            <UpdateProductModal onSuccess={updateRow}/>

            <div className={s.table_content}>
                <UniTable rows={data}
                          columns={columns}
                          isLoading={isLoading}
                          rowOnDoubleClick={(row) => {
                              props.onRowDoubleClick ? props.onRowDoubleClick(row) : true
                          }}
                          rowOnContext={(row, event) => {
                              setContextVisible(true, event.clientX, event.clientY)
                          }}
                />
            </div>
        </>
    )
}