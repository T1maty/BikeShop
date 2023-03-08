import React from 'react';
import TableRow from "@mui/material/TableRow";
import {columns} from "./ProductCatalogTableConfig";
import TableCell from "@mui/material/TableCell";
import useProductCatalogTableStore from "./ProductCatalogTableStore";
import {IProductExtended} from "../../../entities";

interface props {
    row: IProductExtended
}

const ProductCatalogTableRow = (props: props) => {

    const setSelected = useProductCatalogTableStore(s => s.setSelectedRows)
    const selected = useProductCatalogTableStore(s => s.selectedRows)
    const isSelected = useProductCatalogTableStore(s => s.isRowSelected)
    const setOpenContext = useProductCatalogTableStore(s => s.setOpen);

    return (
        <TableRow
            onContextMenu={(event) => {
                setSelected([props.row.product.id])
                setOpenContext(true, event.clientX, event.clientY)
            }}

            onDoubleClick={() => {
                console.log(selected[0])
            }}

            selected={isSelected(props.row.product.id)}

            onClick={() => {
                setSelected([props.row.product.id])
            }}

            hover
            role="checkbox"
            tabIndex={-1}
            key={props.row.product.id}
        >
            {columns.map((column) => {

                let value
                // @ts-ignore
                props.row[column.id] ? value = props.row[column.id] : value = props.row.product[column.id]

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