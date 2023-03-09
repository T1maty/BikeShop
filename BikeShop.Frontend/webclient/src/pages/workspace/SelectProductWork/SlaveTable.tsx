import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {columns} from "../../../widgets/workspace/ProductCatalog/ProductCatalogTable/ProductCatalogTableConfig";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ProductCatalogTableRow
    from "../../../widgets/workspace/ProductCatalog/ProductCatalogTable/ProductCatalogTableRow";
import {IProductExtended} from "../../../entities";

interface props {
    rows: IProductExtended[]
}

const SlaveTable = (props: props) => {
    return (
        <div>
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
                        {props.rows
                            .map((row) => {
                                return (
                                    <ProductCatalogTableRow key={row.product.id} row={row}/>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SlaveTable;