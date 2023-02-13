import React from 'react';
import {ProductCatalogTable, TagTreeView} from "../../../widgets";
import {Button, InputUI} from '../../../shared/ui';
import s from './ProductCatalog.module.scss';

const ProductCatalog = () => {
    return (
        <div className={s.productCatalogTableWrapper}>
            <div className={s.productCatalogTable_mainBlock}>

                <div className={s.productCatalogTable_leftSide}>
                    <div className={s.leftSide_header}>
                        555
                    </div>
                    <div className={s.leftSide_tree}>
                        <TagTreeView/>
                    </div>
                </div>

                <div className={s.productCatalogTable_rightSide}>
                    <div className={s.rightSide_searchRow}>
                        <div className={s.searchRow_chooseBtn}>
                            <Button text={'Отображение'} onClick={() => {
                            }}/>
                        </div>
                        <div className={s.searchRow_searchInput}>
                            <InputUI placeholder={'Поиск...'}/>
                        </div>
                        <div className={s.searchRow_allProductsBtn}>
                            <Button text={'Все товары'} onClick={() => {
                            }}/>
                        </div>
                        <div className={s.header_notSortedBtn}>
                            <Button text={'Неотсортированные'} onClick={() => {
                            }}/>
                        </div>
                    </div>

                    <div className={s.rightSide_table}>
                        <ProductCatalogTable/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCatalog;

/*
<div>
    <Grid container spacing={1}>
        <Grid item xs={4}>
            <TagTreeView/>
        </Grid>
        <Grid item xs={8}>
            <ProductCatalogTable/>
        </Grid>
    </Grid>
</div>*/
