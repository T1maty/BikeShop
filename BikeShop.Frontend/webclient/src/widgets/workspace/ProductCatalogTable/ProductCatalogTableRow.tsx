import React from 'react';
import TableRow from "@mui/material/TableRow";
import {columns} from "./ProductCatalogTableConfig";
import TableCell from "@mui/material/TableCell";
import useProductCatalogTableStore from "./ProductCatalogTableStore";
import {IProduct} from "../../../entities";

interface props {
    row: IProduct
}

const ProductCatalogTableRow = (props: props) => {

    const setSelected = useProductCatalogTableStore(s => s.setSelectedRows)
    const selected = useProductCatalogTableStore(s => s.selectedRows)
    const isSelected = useProductCatalogTableStore(s => s.isRowSelected)
    const setOpenContext = useProductCatalogTableStore(s => s.setOpen);

    return (
        <TableRow
            onContextMenu={(event) => {
                setSelected([props.row.id])
                setOpenContext(true, event.clientX, event.clientY)
            }}

            onDoubleClick={() => {
                console.log(selected[0])
            }}

            selected={isSelected(props.row.id)}

            onClick={() => {
                setSelected([props.row.id])
            }}

            hover
            role="checkbox"
            tabIndex={-1}
            key={props.row.id}
        >
            {columns.map((column) => {
                const value = props.row[column.id];
                return (
                    <TableCell key={column.id} align={column.align}>
                        {value}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

export default ProductCatalogTableRow;