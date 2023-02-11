import React from 'react';
import TablePagination from "@mui/material/TablePagination";
import useProductCatalogTableStore from "./productCatalogTableStore";

const ProductCatalogTablePagination = () => {

    const rows = useProductCatalogTableStore(s => s.rows)
    const setPage = useProductCatalogTableStore(s => s.setPage)
    const setRowsPerPage = useProductCatalogTableStore(s => s.setRowsPerPage)
    const page = useProductCatalogTableStore(s => s.page)
    const rowsPerPage = useProductCatalogTableStore(s => s.rowsPerPage)

    return (
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, page) => {
                setPage(page)
            }}
            onRowsPerPageChange={(event) => {
                setRowsPerPage(+event.target.value);
                setPage(0)
            }}
        />
    );
};

export default ProductCatalogTablePagination;