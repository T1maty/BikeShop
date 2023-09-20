import React, {useEffect} from 'react';
import s from './CardCatalog.module.scss'
import {ProductCatalogTable} from "../../../widgets";
import useCardCatalogStore from "./CardCatalogStore";
import ProductCatalogTableHeader
    from "../../../widgets/workspace/ProductCatalog/ProductCatalogTable/ProductCatalogTableHeader";

const CardCatalog = () => {
    const getState = useCardCatalogStore(s => s.getCatalogState)
    const getStorages = useCardCatalogStore(s => s.getStorages)

    useEffect(() => {
        getState()
        getStorages()
    }, [])
    return (
        <div className={s.wrapper}>
            <div className={s.trees}></div>

            <div className={s.table}>
                <div className={s.table_header}><ProductCatalogTableHeader/></div>
                <div className={s.table_data}><ProductCatalogTable/></div>
            </div>
        </div>
    );
};

export default CardCatalog;