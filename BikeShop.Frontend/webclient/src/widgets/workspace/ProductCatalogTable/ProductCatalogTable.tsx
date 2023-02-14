import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {CreateProductModal, UpdateProductModal} from '../../../features';
import ProductCatalogTableContextMenu from './ProductCatalogTableContextMenu';
import {columns} from './ProductCatalogTableConfig';
import useProductCatalogTableStore from './ProductCatalogTableStore';
import ProductCatalogTablePagination from './ProductCatalogTablePagination';
import ProductCatalogTableRow from './ProductCatalogTableRow';
import s from "../../../pages/workspace/ProductCatalog/ProductCatalog.module.scss";

const ProductCatalogTable = () => {

    const page = useProductCatalogTableStore(s => s.page)
    const rowsPerPage = useProductCatalogTableStore(s => s.rowsPerPage)
    const rows = useProductCatalogTableStore(s => s.rows)
    const setRows = useProductCatalogTableStore(s => s.setRows)
    const getProducts = useProductCatalogTableStore(s => s.getProducts)
    const updateRow = useProductCatalogTableStore(s => s.updateRow)
    const addNewProduct = useProductCatalogTableStore(s => s.addNewProduct)

    useEffect(() => {
        getProducts().then((r) => {
            setRows(r.data.products)
        })
    }, [])

    return (
        <>
            <ProductCatalogTableContextMenu/>
            <CreateProductModal onSuccess={addNewProduct}/>
            <UpdateProductModal onSuccess={updateRow}/>
            <div className={s.table_content}>
                <TableContainer>
                    <Table
                        stickyHeader
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
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <ProductCatalogTableRow key={row.id} row={row}/>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className={s.table_pagination}>
                <ProductCatalogTablePagination/>
            </div>
        </>
    );
}

export default ProductCatalogTable;

{/*

<Box sx={{
    width: '95%',
    overflow: 'hidden',
    backgroundColor: '#33373B',
    borderRadius: 5,
    p: 2,
    m: 2
}}
     onContextMenu={(event) => {
         event.preventDefault()
     }}
>

    <ProductCatalogTableContextMenu/>
    <CreateProductModal onSuccess={addNewProduct}/>
    <UpdateProductModal onSuccess={updateRow}/>

    <TableContainer sx={{maxHeight: 440}}>
        <Table
            stickyHeader
            aria-label="sticky table"
            size={"small"}

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
            <TableBody>
                {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                            <ProductCatalogTableRow key={row.id} row={row}/>
                        );
                    })}
            </TableBody>
        </Table>
    </TableContainer>
    <ProductCatalogTablePagination/>
</Box>
*/
}
