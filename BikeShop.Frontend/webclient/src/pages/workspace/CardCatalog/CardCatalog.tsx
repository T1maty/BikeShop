import React, {useEffect} from 'react';
import s from './CardCatalog.module.scss'
import {ProductCatalogTable} from "../../../widgets";
import useCardCatalogStore from "./CardCatalogStore";

const CardCatalog = () => {
    const getState = useCardCatalogStore(s => s.getCatalogState)

    useEffect(() => {
        getState()
    }, [])
    return (
        <div className={s.wrapper}>
            <div className={s.trees}></div>
            <div className={s.table}>
                <ProductCatalogTable/>
            </div>
        </div>
    );
};

export default CardCatalog;