import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {CreateProductModal, UpdateProductModal} from '../../../../features'
import {ProductCatalogTableContextMenu} from './ProductCatalogTableContextMenu'
import {columns} from './ProductCatalogTableConfig'
import useProductCatalogTableStore from './ProductCatalogTableStore'
import s from "../../../../pages/workspace/ProductCatalog/ProductCatalog.module.scss"
import {IProduct, IProductExtended} from "../../../../entities"
import {ProductCatalogTableRow} from "./ProductCatalogTableRow"

interface props {
    onRowDoubleClick?: (product: IProductExtended) => void
}

export const ProductCatalogTable = (props: props) => {

    const page = useProductCatalogTableStore(s => s.page)
    const rowsPerPage = useProductCatalogTableStore(s => s.rowsPerPage)
    const rows = useProductCatalogTableStore(s => s.rows)
    const updateRow = useProductCatalogTableStore(s => s.updateRow)
    const addNewProduct = useProductCatalogTableStore(s => s.addNewProduct)

    function createProductSuccessHandler(product: IProduct) {
        let extProd: IProductExtended;
        extProd = {} as IProductExtended
        extProd.product = product
        extProd.quantity = 0

        addNewProduct(extProd)
    }

    return (
        <>
            <ProductCatalogTableContextMenu/>
            <CreateProductModal onSuccess={createProductSuccessHandler}/>
            <UpdateProductModal onSuccess={updateRow}/>
            <div className={s.table_content}>
                <TableContainer>
                    <Table
                        stickyHeader={true}
                        aria-label="sticky table"
                        size={'small'}
                    >
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody

                        >
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <ProductCatalogTableRow onRowDoubleClick={props.onRowDoubleClick}
                                                                key={row.product.id} row={row}/>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className={s.table_pagination}>
                {/*<ProductCatalogTablePagination/>*/}
            </div>
        </>
    )
}