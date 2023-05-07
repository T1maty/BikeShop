import React from 'react'
import {CreateProductModal, UpdateProductModal, UpdateProductPricesModal} from '../../../../features'
import {ProductCatalogTableContextMenu} from './ProductCatalogTableContextMenu'
import useProductCatalogTableStore from './ProductCatalogTableStore'
import {Product} from "../../../../entities"
import {UniTable} from "../../../../shared/ui"
import {columns} from "./ProductCatalogTableConfig"
import {useProductCatalogStorage} from "../../../../pages/workspace/ProductCatalog/ProductCatalogStorage"

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
    const storageData = useProductCatalogStorage(s => s.storageData)


    const createProductSuccessHandler = (product: Product) => {
        addNewProduct(product)
    }

    let data = rows.map((item) => {
        let sd = storageData.find(n => n.productId == item.id)
        var color = ""
        if (sd != undefined && sd.available > 0) color = "#599B59"
        if (sd != undefined && sd.available < 0) color = "#650000"
        return {
            ...item,
            quantity: sd != undefined ? sd.available : 0,
            reserved: sd != undefined ? sd.reserved : 0,
            color: color
        }
    }).sort((a, b) => {
        if (a.quantity > 0) return 1
        else return 0
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
                          setSelected([row as Product])
                      }}
                      rowOnClick={(row) => {
                          setSelected([row as Product])
                      }}
            />
        </>
    )
}