import React from 'react';
import s from '../../../../pages/workspace/CardCatalog/CardCatalog.module.scss'
import {selectColorStyles} from "../../../../app/styles/variables/selectColorStyles";
import Select from "react-select";
import useCardCatalogStore from "../../../../pages/workspace/CardCatalog/CardCatalogStore";
import {AsyncSelectSearchProductCard} from "../../../../shared/ui/AsyncSelectSearch/AsyncSelectSearchProductCard";

const ProductCatalogTableHeader = () => {
    const selectedStorage = useCardCatalogStore(s => s.selectedStorage)
    const setSelectedStorage = useCardCatalogStore(s => s.setSelectedStorage)
    const storages = useCardCatalogStore(s => s.storages)
    const sortMode = useCardCatalogStore(s => s.sortMode)
    const setSortMode = useCardCatalogStore(s => s.setSortMode)
    const getCatalogStateSearch = useCardCatalogStore(s => s.getCatalogStateSearch)

    let opt = [{name: "SortByStorageDescend"}, {name: "SortByStorageAscend"}]
    return (
        <>
            <div className={s.table_header_sort}>
                <Select
                    isClearable
                    placeholder={'Сортировка'}
                    isSearchable={false}
                    options={opt}
                    value={sortMode}
                    onChange={setSortMode}
                    getOptionLabel={label => label.name}
                    getOptionValue={value => value.name}
                    styles={selectColorStyles}
                />
            </div>
            <div className={s.table_header_search}><AsyncSelectSearchProductCard onSelect={(value, querry) => {
                getCatalogStateSearch(querry)
            }}/></div>
            <div className={s.table_header_storage}>
                <Select
                    placeholder={'Склад'}
                    isSearchable={false}
                    options={storages}
                    value={selectedStorage}
                    onChange={(v) => {
                        setSelectedStorage(v!.id)
                    }}
                    getOptionLabel={label => label.name}
                    getOptionValue={value => value.name}
                    styles={selectColorStyles}
                />
            </div>
        </>
    );
};

export default ProductCatalogTableHeader;