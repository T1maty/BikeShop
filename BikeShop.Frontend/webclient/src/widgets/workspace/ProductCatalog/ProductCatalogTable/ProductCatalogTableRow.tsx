import React from 'react';
import {Product, useCurrency} from "../../../../entities";
import s from './ProductCatalogTable.module.scss'
import {useProductCatalogStorage} from "../../../../pages/workspace/ProductCatalog/ProductCatalogStorage";
import useProductCatalogTableStore from "./ProductCatalogTableStore";

const ProductCatalogTableRow = (p: { product: Product }) => {
    const storageData = useProductCatalogStorage(s => s.storageData)
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)
    const colP = useProductCatalogTableStore(s => s.columnsProps)

    let st = storageData.find(n => n.productId === p.product.id)
    return (
        <tr className={s.row}>
            <td className={s.cell}>
                {p.product.id}
            </td>
            <td className={s.cell}>
                {p.product.name}

            </td>
            <td className={s.cell}>
                {st?.available} {p.product.quantityUnitName}
            </td>
            <td className={s.cell}>
                {st?.reserved} {p.product.quantityUnitName}
            </td>
            <td className={s.cell}>
                {r(fbts.c * p.product.incomePrice) + fbts.s}
            </td>
            <td className={s.cell}>
                {r(fbts.c * p.product.dealerPrice) + fbts.s}
            </td>
            <td className={s.cell}>
                {r(fbts.c * p.product.retailPrice) + fbts.s}
            </td>
            <td className={s.cell}>
                {p.product.catalogKey}
            </td>
        </tr>
    );
};

export default ProductCatalogTableRow;