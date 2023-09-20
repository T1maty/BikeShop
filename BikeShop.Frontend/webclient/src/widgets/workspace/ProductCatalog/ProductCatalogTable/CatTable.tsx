import React from 'react';
import {ProductCatalogTableContextMenu} from "./ProductCatalogTableContextMenu";
import {UpdateProductModal, UpdateProductPricesModal} from "../../../../features";
import {CreateProductModal} from "../CreateProductModal/CreateProductModal";
import {UniTable} from "../../../../shared/ui";
import {columns} from "./ProductCatalogTableConfig";
import {Product} from "../../../../entities";
import useProductCatalogTableStore from "./ProductCatalogTableStore";
import {useProductCatalogStorage} from "../../../../pages/workspace/ProductCatalog/ProductCatalogStorage";

const CatTable = (p: { onRowDoubleClick: (p: Product) => void }) => {
    const setProductsToTable = useProductCatalogTableStore(s => s.getProducts)
    const setRows = useProductCatalogTableStore(s => s.setRows)
    const productCards = useProductCatalogTableStore(s => s.productCards)

    const storageData = useProductCatalogStorage(s => s.storageData)

    const isLoading = useProductCatalogTableStore(s => s.isLoading)
    const rows = useProductCatalogTableStore(s => s.rows)
    const updateRow = useProductCatalogTableStore(s => s.updateRow)
    const addNewProduct = useProductCatalogTableStore(s => s.addNewProduct)
    const setContextVisible = useProductCatalogTableStore(s => s.setOpen)
    const displayedRows = useProductCatalogTableStore(s => s.displayedRows)
    const reloadDisplayedRows = useProductCatalogTableStore(s => s.reloadDisplayedRows)
    const getProductCards = useProductCatalogTableStore(s => s.getProductCards)

    const setSelected = useProductCatalogTableStore(s => s.setSelectedRows)
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
                          p.onRowDoubleClick(row as Product)
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
    );
};

export default CatTable;