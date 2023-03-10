import React from 'react';

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {columns} from "./SlaveTableConfig";
import {ServiceItemProduct} from "../../../entities/models/ServiceItem";

interface props {
    row: ServiceItemProduct
    onRowDoubleClick?: (product: ServiceItemProduct) => void
}

const SlaveTableRow = (props: props) => {
    return (
        <TableRow
            onContextMenu={(event) => {

            }}

            onDoubleClick={() => {
                props.onRowDoubleClick ? props.onRowDoubleClick(props.row) : true
            }}

            //selected={}

            onClick={() => {

            }}

            hover
            role="checkbox"
            tabIndex={-1}
            key={props.row.id}
        >

            {columns.map((column) => {

                let value = props.row[column.id]

                return (
                    <TableCell key={column.id} align={column.align}>
                        {value}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

export default SlaveTableRow;