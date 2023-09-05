import React from 'react';
import FiltersSelected from "./FiltersSelected/FiltersSelected";
import FiltersAvailable from "./FiltersAvailable/FiltersAvailable";
import s from './ProductCatalogFilters.module.scss'
import useProductCatalogFiltersStore from "./ProductCatalogFiltersStore";

const ProductCatalogFilters = () => {
    const isLoading = useProductCatalogFiltersStore(s => s.isLoading)
    //console.log(isLoading)
    //if (isLoading) return (<Loader variant={'ellipsis'}/>)
    return (
        <div className={s.wrapper}>
            <FiltersSelected/>
            <FiltersAvailable/>
        </div>
    );
};

export default ProductCatalogFilters;