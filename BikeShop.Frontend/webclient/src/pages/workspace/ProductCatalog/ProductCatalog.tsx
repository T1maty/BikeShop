import React from 'react'
import {ProductCatalogTable, ProductTagCloud, TagTreeView} from "../../../widgets"
import {Button, InputUI} from '../../../shared/ui'
import s from './ProductCatalog.module.scss'
import useEditProductCardModal
    from "../../../features/ProductCatalogFeatures/EditProductCardModal/EditProductCardModalStore"
import {EditProductCardModal} from "../../../features/ProductCatalogFeatures/EditProductCardModal/EditProductCardModal"

export const ProductCatalog = () => {

    const getProductCard = useEditProductCardModal(s => s.getProductCard)

    return (
        // <div className={s.productCatalogTableWrapper}>
        <div className={s.productCatalogTable_mainBlock}>
            <EditProductCardModal/>

            <div className={s.productCatalogTable_leftSide}>
                <div className={s.leftSide_header}>
                    <ProductTagCloud/>
                </div>
                <div className={s.leftSide_tree}>
                    <TagTreeView/>
                </div>
            </div>

            <div className={s.productCatalogTable_rightSide}>
                <div className={s.rightSide_searchRow}>
                    {/*<div className={s.searchRow_chooseBtn}>*/}
                    <Button onClick={() => {}}>
                        Отображение
                    </Button>
                    {/*</div>*/}
                    <div className={s.searchRow_searchInput}>
                        <InputUI placeholder={'Поиск...'} clearInputValue={() => {}}/>
                    </div>
                    <Button buttonDivWrapper={s.searchRow_allProductsBtn} onClick={() => {}}>
                        Все товары
                    </Button>
                    {/*<div className={s.header_notSortedBtn}>*/}
                    <Button onClick={() => {}}>
                        Неотсортированные
                    </Button>
                    {/*</div>*/}
                </div>

                <div className={s.rightSide_table} onContextMenu={(event) => {event.preventDefault()}}>
                    <ProductCatalogTable onRowDoubleClick={(row: any) => {getProductCard(row.id)}}/>
                </div>
            </div>
        </div>
        // </div>
    )
}