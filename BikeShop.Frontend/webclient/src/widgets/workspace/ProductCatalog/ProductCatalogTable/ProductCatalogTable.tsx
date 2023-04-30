import React from 'react'
import s from "../../../../pages/workspace/ProductCatalog/ProductCatalog.module.scss"
import {UpdateProductPricesModal, CreateProductModal, UpdateProductModal} from '../../../../features'
import {ProductCatalogTableContextMenu} from './ProductCatalogTableContextMenu'
import useProductCatalogTableStore from './ProductCatalogTableStore'
import {Product, ProductExtended} from "../../../../entities"
import {UniTable} from "../../../../shared/ui"
import {columns} from "./ProductCatalogTableConfig"

interface CatalogTableProps {
    onRowDoubleClick?: (product: any) => void
}

export const ProductCatalogTable = (props: CatalogTableProps) => {

    const isLoading = useProductCatalogTableStore(s => s.isLoading)
    const rows = useProductCatalogTableStore(s => s.rows)
    const updateRow = useProductCatalogTableStore(s => s.updateRow)
    const addNewProduct = useProductCatalogTableStore(s => s.addNewProduct)
    const setContextVisible = useProductCatalogTableStore(s => s.setOpen)

    const setSelected = useProductCatalogTableStore(s => s.setSelectedRows)

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
            quantityUnitName: item.quantityUnit?.name ? item.quantityUnit?.name : 'Error',
            quantityId: item.quantityUnit?.id ? item.quantityUnit?.id : 0
        }
    })

    return (
        <>
            <ProductCatalogTableContextMenu/>
            <UpdateProductPricesModal/>
            <CreateProductModal onSuccess={createProductSuccessHandler}/>
            <UpdateProductModal onSuccess={updateRow}/>

            <UniTable rows={data}
                      columns={columns}
                      isLoading={isLoading}
                      rowOnDoubleClick={(row) => {
                          props.onRowDoubleClick ? props.onRowDoubleClick(row) : true
                      }}
                      rowOnContext={(row, event) => {
                          setContextVisible(true, event.clientX, event.clientY)
                          let prd: ProductExtended = {} as ProductExtended
                          prd.product = (row as Product)
                          setSelected([prd])
                      }}
                      rowOnClick={(row) => {
                          let prd: ProductExtended = {} as ProductExtended
                          prd.product = (row as Product)
                          setSelected([prd])
                      }}
            />
        </>
    )
}