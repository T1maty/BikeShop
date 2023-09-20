import React from 'react';
import s from '../../../../pages/workspace/CardCatalog/CardCatalog.module.scss'

import {AsyncSelectSearchProduct} from "../../../../shared/ui";
import {selectColorStyles} from "../../../../app/styles/variables/selectColorStyles";
import Select from "react-select";
import useCardCatalogStore from "../../../../pages/workspace/CardCatalog/CardCatalogStore";

const ProductCatalogTableHeader = () => {
    const selectedStorage = useCardCatalogStore(s => s.selectedStorage)
    const setSelectedStorage = useCardCatalogStore(s => s.setSelectedStorage)
    const storages = useCardCatalogStore(s => s.storages)

    return (
        <>
            <div className={s.table_header_search}><AsyncSelectSearchProduct onSelect={() => {
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