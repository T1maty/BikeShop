import React from 'react';
import s from './FiltersSelected.module.scss'
import {DeleteButton} from "../../../../../shared/ui";
import useProductCatalogFiltersStore from "../ProductCatalogFiltersStore";
import {ProductFilterVariantDTO} from "../../../../../entities/responses/ProductFilterVariantDTO";

const SelectedFilterItem = (p: { children: ProductFilterVariantDTO }) => {
    const removeSelectedFilter = useProductCatalogFiltersStore(s => s.removeSelectedFilter)

    return (
        <div className={s.item}>
            {p.children.variantName}
            <DeleteButton size={20} onClick={() => {
                {
                    removeSelectedFilter(p.children)
                }
            }}/>
        </div>
    );
};

export default SelectedFilterItem;