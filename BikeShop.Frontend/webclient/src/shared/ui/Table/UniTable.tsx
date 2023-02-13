import React from 'react';
import {ITableProps} from "./ITableProps";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";


export const UniTable = (props: ITableProps) => {

    return (
        <TableContainer>
            <Table stickyHeader size={'small'}>
                <TableHead>
                    <TableRow>
                        {props.columns.map((column) => (
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

                    {props.rows
                        .map((row) => {
                            return (
                                <TableRow
                                    onContextMenu={props.rowOnContext ? props.rowOnContext : () => {
                                    }}

                                    onDoubleClick={props.rowOnDoubleClick ? props.rowOnDoubleClick : () => {
                                    }}

                                    selected={props.selectedRowsIds.includes(row.id?.toString())}
                                    onClick={props.rowOnClick ? props.rowOnClick : () => {
                                    }}

                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    {props.columns.map((column) => {
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {row[column.id]}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};