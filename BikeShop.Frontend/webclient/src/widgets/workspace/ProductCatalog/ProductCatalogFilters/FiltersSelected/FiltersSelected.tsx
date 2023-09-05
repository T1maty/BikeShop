import React from 'react';
import s from './FiltersSelected.module.scss'
import SelectedFilterItem from "./SelectedFilterItem";
import {DeleteButton} from "../../../../../shared/ui";
import useProductCatalogFiltersStore from "../ProductCatalogFiltersStore";

const FiltersSelected = () => {
    const selectedFilters = useProductCatalogFiltersStore(s => s.selectedFilters)
    const clearSelectedFilters = useProductCatalogFiltersStore(s => s.clearSelectedFilters)

    return (
        <div className={s.wrapper}>
            <div className={s.label}>Обрані фільтри: <DeleteButton size={20} onClick={clearSelectedFilters}/></div>
            {
                selectedFilters.map(n => {
                    return (
                        <SelectedFilterItem>{n}</SelectedFilterItem>
                    )
                })
            }
        </div>
    );
};

export default FiltersSelected;