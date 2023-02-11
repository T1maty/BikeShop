import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box} from "@mui/material";
import {CreateProductModal} from "../../../features";
import ProductCatalogTableContextMenu from "./ProductCatalogTableContextMenu";
import {columns, testRows} from "./ProductCatalogTableConfig";
import useProductCatalogTableStore from './ProductCatalogTableStore';
// @ts-ignore
import ProductCatalogTablePagination from './ProductCatalogTablePagination';
// @ts-ignore
import ProductCatalogTableRow from './ProductCatalogTableRow';

const ProductCatalogTable = () => {

    const page = useProductCatalogTableStore(s => s.page)
    const rowsPerPage = useProductCatalogTableStore(s => s.rowsPerPage)
    const rows = useProductCatalogTableStore(s => s.rows)
    const setRows = useProductCatalogTableStore(s => s.setRows)

    React.useEffect(() => {
        setRows(testRows)
    }, [])

    return (
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
            <CreateProductModal/>
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
    );
}

export default ProductCatalogTable;