import React, {useEffect, useRef} from 'react'
import useProductCatalogTableStore from './ProductCatalogTableStore'
import {useProductCatalogStorage} from "../../../../pages/workspace/ProductCatalog/ProductCatalogStorage"
import useProductCatalogFiltersStore from "../ProductCatalogFilters/ProductCatalogFiltersStore";
import {ProductCatalogTableContextMenu} from "./ProductCatalogTableContextMenu";
import {CreateProductModal, UpdateProductModal, UpdateProductPricesModal} from "../../../../features";
import {UniTable} from "../../../../shared/ui";
import {columns} from "./ProductCatalogTableConfig";
import {Product} from "../../../../entities";

interface CatalogTableProps {
    onRowDoubleClick?: (product: any) => void
}


export const ProductCatalogTable = (props: CatalogTableProps) => {

    const isLoading = useProductCatalogTableStore(s => s.isLoading)
    const rows = useProductCatalogTableStore(s => s.rows)
    const updateRow = useProductCatalogTableStore(s => s.updateRow)
    const addNewProduct = useProductCatalogTableStore(s => s.addNewProduct)
    const setContextVisible = useProductCatalogTableStore(s => s.setOpen)
    const displayedRows = useProductCatalogTableStore(s => s.displayedRows)
    const reloadDisplayedRows = useProductCatalogTableStore(s => s.reloadDisplayedRows)

    const setSelected = useProductCatalogTableStore(s => s.setSelectedRows)
    const storageData = useProductCatalogStorage(s => s.storageData)
    const selectedFilters = useProductCatalogFiltersStore(s => s.selectedFilters)

    useEffect(() => {
        reloadDisplayedRows(selectedFilters)
    }, [rows, selectedFilters])


    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (divRef.current) {
            console.log('Ширина таблиці: ', divRef.current.offsetWidth)
        }
    }, [divRef]);

    let data = displayedRows.map((item) => {
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
            <CreateProductModal onSuccess={addNewProduct}/>
            <UpdateProductModal onSuccess={updateRow}/>


            {
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
            }

        </>
    )

}