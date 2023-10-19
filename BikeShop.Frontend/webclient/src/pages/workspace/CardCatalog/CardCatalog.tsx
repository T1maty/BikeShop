import React, {useEffect} from 'react';
import s from './CardCatalog.module.scss'
import {ProductCatalogTable, TagTreeView} from "../../../widgets";
import useCardCatalogStore from "./CardCatalogStore";
import ProductCatalogTableHeader
    from "../../../widgets/workspace/ProductCatalog/ProductCatalogTable/ProductCatalogTableHeader";
import ProductCatalogTablePaggination
    from "../../../widgets/workspace/ProductCatalog/ProductCatalogTable/ProductCatalogTablePaggination";
import CardCatalogFilters from "./CartCatalogFilters/CardCatalogFilters";

const CardCatalog = () => {
    const getStorages = useCardCatalogStore(s => s.getStorages)
    const setSelectedPage = useCardCatalogStore(s => s.setSelectedPage)
    const setLastCategoryId = useCardCatalogStore(s => s.setLastCategoryId)

    useEffect(() => {
        getStorages()
    }, [])

    return (
        <div className={s.wrapper}>
            <div className={s.trees}>
                <div className={s.filters}><CardCatalogFilters/></div>
                <div className={s.categories}><TagTreeView onNodeClick={(n) => {
                    setLastCategoryId(n.id)
                    setSelectedPage(1)
                }} onNodeContext={n => {
                    setLastCategoryId(n.id)
                    setSelectedPage(1)
                }}/></div>
            </div>
            <div className={s.table}>
                <div className={s.table_header}><ProductCatalogTableHeader/></div>
                <div className={s.table_data}><ProductCatalogTable/></div>
                <div className={s.table_pag}><ProductCatalogTablePaggination/></div>
            </div>
        </div>
    );
};

export default CardCatalog;