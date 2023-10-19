import React from 'react';
import s from './CardCatalogFilters.module.scss'
import useCardCatalogStore from "../CardCatalogStore";

const CardCatalogFilters = () => {
    const catalogState = useCardCatalogStore(s => s.catalogState)


    return (
        <div className={s.wrapper}>
            <div className={s.selected}>

            </div>
            <div className={s.available}>
                {catalogState?.options.map(option => {
                    return (
                        <div>
                            {option.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default CardCatalogFilters;