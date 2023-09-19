import React, {useEffect} from 'react'
import useProductCatalogTableStore from './ProductCatalogTableStore'
import {useProductCatalogStorage} from "../../../../pages/workspace/ProductCatalog/ProductCatalogStorage"
import useProductCatalogFiltersStore from "../ProductCatalogFilters/ProductCatalogFiltersStore";
import {ProductCatalogTableContextMenu} from "./ProductCatalogTableContextMenu";
import {UniTable} from "../../../../shared/ui";
import {columns} from "./ProductCatalogTableConfig";
import {Product} from "../../../../entities";
import {UpdateProductModal, UpdateProductPricesModal} from "../../../../features";
import {CreateProductModal} from "../CreateProductModal/CreateProductModal";
import s from './ProductCatalogTable.module.scss'
import ProductCatalogTableRow from "./ProductCatalogTableRow";

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
    const productCards = useProductCatalogTableStore(s => s.productCards)
    const getProductCards = useProductCatalogTableStore(s => s.getProductCards)

    const setSelected = useProductCatalogTableStore(s => s.setSelectedRows)
    const storageData = useProductCatalogStorage(s => s.storageData)
    const selectedFilters = useProductCatalogFiltersStore(s => s.selectedFilters)

    useEffect(() => {
        getProductCards()
    }, [])
    useEffect(() => {
        reloadDisplayedRows(selectedFilters, storageData)
    }, [selectedFilters, rows])

    if (false) {
        return (
            <>
                <ProductCatalogTableContextMenu/>
                <UpdateProductPricesModal/>
                <CreateProductModal onSuccess={addNewProduct}/>
                <UpdateProductModal onSuccess={updateRow}/>
                <UniTable rows={displayedRows}
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

    return (
        <div className={s.wrapper}>
            {productCards.map(product => <ProductCatalogTableRow product={product}/>)}

        </div>
    )

}