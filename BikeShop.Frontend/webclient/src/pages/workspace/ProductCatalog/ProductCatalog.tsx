import React, {useEffect, useState} from 'react'
import {ProductCatalogTable, ProductTagCloud, TagTreeView} from "../../../widgets"
import {Button, InputUI} from '../../../shared/ui'
import s from './ProductCatalog.module.scss'
import useEditProductCardModal
    from "../../../features/ProductCatalogFeatures/EditProductCardModal/EditProductCardModalStore"
import {EditProductCardModal} from "../../../features"
import {useSnackbar} from "notistack"
import {ProductTag} from "../../../entities";

export const ProductCatalog = () => {

    const {enqueueSnackbar} = useSnackbar()

    const getProductCard = useEditProductCardModal(s => s.getProductCard)
    const isError = useEditProductCardModal(s => s.isError)

    const [tags, setTags] = useState<ProductTag[]>([])

    useEffect(() => {
        if (isError) {
            enqueueSnackbar('Ошибка сервера: карточка не загружена!',
                {
                    variant: 'error', autoHideDuration: 3000,
                    anchorOrigin: {vertical: 'bottom', horizontal: 'center'}
                })
        }
    }, [isError])

    return (
        // <div className={s.productCatalogTableWrapper}>
        <div className={s.productCatalogTable_mainBlock}>
            <EditProductCardModal/>

            <div className={s.productCatalogTable_leftSide}>
                <div className={s.leftSide_header}>
                    <ProductTagCloud tags={tags} setTags={setTags}/>
                </div>
                <div className={s.leftSide_tree}>
                    <TagTreeView setTags={setTags} tags={tags}/>
                </div>
            </div>

            <div className={s.productCatalogTable_rightSide}>
                <div className={s.rightSide_searchRow}>
                    {/*<div className={s.searchRow_chooseBtn}>*/}
                    <Button onClick={() => {
                    }}>
                        Отображение
                    </Button>
                    {/*</div>*/}
                    <div className={s.searchRow_searchInput}>
                        <InputUI placeholder={'Поиск...'} clearInputValue={() => {
                        }}/>
                    </div>
                    <Button buttonDivWrapper={s.searchRow_allProductsBtn} onClick={() => {
                    }}>
                        Все товары
                    </Button>
                    {/*<div className={s.header_notSortedBtn}>*/}
                    <Button onClick={() => {
                    }}>
                        Неотсортированные
                    </Button>
                    {/*</div>*/}
                </div>

                <div className={s.rightSide_table} onContextMenu={(event) => {
                    event.preventDefault()
                }}>
                    <ProductCatalogTable onRowDoubleClick={(row: any) => {
                        getProductCard(row.id)
                    }}/>
                </div>
            </div>
        </div>
        // </div>
    )
}