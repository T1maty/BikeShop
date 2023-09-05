import React from 'react';
import s from './ProductCatalogTable.module.scss'
import useProductCatalogTableStore from "./ProductCatalogTableStore";

const ProductCatalogTableHeader = () => {
    const columns = useProductCatalogTableStore(s => s.getCells)

    return (
        <tr className={s.header}>
            {columns().map(n => <th className={s.header_cell}>{n}</th>)}
        </tr>
    );
};

export default ProductCatalogTableHeader;