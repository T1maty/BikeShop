import React from 'react';
import s from './FiltersAvailable.module.scss'
import useProductCatalogFiltersStore from "../ProductCatalogFiltersStore";

const FiltersAvailable = () => {
    const filters = useProductCatalogFiltersStore(s => s.filters)
    const addSelectedFilter = useProductCatalogFiltersStore(s => s.addSelectedFilter)


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