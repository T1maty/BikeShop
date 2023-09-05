import React, {useEffect} from 'react';
import s from './FiltersAvailable.module.scss'
import useProductCatalogFiltersStore from "../ProductCatalogFiltersStore";
import useProductCatalogTableStore from "../../ProductCatalogTable/ProductCatalogTableStore";

const FiltersAvailable = () => {
    const filters = useProductCatalogFiltersStore(s => s.filters)
    const getFilters = useProductCatalogFiltersStore(s => s.getFilters)
    const addSelectedFilter = useProductCatalogFiltersStore(s => s.addSelectedFilter)
    const rows = useProductCatalogTableStore(s => s.rows)

    useEffect(() => {
        getFilters(rows.map(n => n.id))

    }, [rows])
    return (
        <div className={s.wrapper}>
            <div className={s.main_label}>Доступні фільтри:</div>
            {
                filters.map(n => {
                    return (
                        <div className={s.filter}>
                            <div className={s.label}>{n.name}</div>
                            {
                                n.variants.map(r => {
                                    return (
                                        <div className={s.variant} onClick={() => {
                                            addSelectedFilter(r)
                                        }}>
                                            {r.variantName}
                                        </div>
                                    )
                                })
                            }

                        </div>
                    )
                })
            }
        </div>
    );
};

export default FiltersAvailable;