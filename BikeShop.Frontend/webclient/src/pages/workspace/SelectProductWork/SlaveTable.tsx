import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {ServiceItemProduct} from "../../../entities/models/ServiceItem";
import {columns} from "./SlaveTableConfig";
import SlaveTableRow from "./SlaveTableRow";

interface props {
    rows: ServiceItemProduct[]
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
                                    <SlaveTableRow key={row.id} row={row}
                                    />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SlaveTable;