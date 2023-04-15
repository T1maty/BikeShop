import React, {ChangeEvent, useEffect, useState} from 'react'
import {ProductCatalogTable, ProductTagCloud, TagTreeView} from "../../../widgets"
import {Button, CustomSearchInput} from '../../../shared/ui'
import s from './ProductCatalog.module.scss'
import useEditProductCardModal
    from "../../../features/ProductCatalogFeatures/EditProductCardModal/EditProductCardModalStore"
import {EditProductCardModal} from "../../../features"
import {useSnackbar} from "notistack"
import {ProductTag} from "../../../entities";
import useProductCatalogTableStore
    from "../../../widgets/workspace/ProductCatalog/ProductCatalogTable/ProductCatalogTableStore";

export const ProductCatalog = () => {

    const {enqueueSnackbar} = useSnackbar()

    const getProductCard = useEditProductCardModal(s => s.getProductCard)
    const isError = useEditProductCardModal(s => s.isError)
    const snstt = useProductCatalogTableStore(s => s.setNotSortedToTable)

    const [tags, setTags] = useState<ProductTag[]>([])

    const [value, setValue] = useState('') // заглушка для инпута

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
                    <Button onClick={() => {
                    }}>
                        Отображение
                    </Button>
                    <CustomSearchInput placeholder={'Поиск...'}
                                       divClassName={s.searchRow_searchInput}
                                       value={value}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                           setValue(e.currentTarget.value)
                                       }}
                                       clearInputValue={() => {
                                           setValue('')
                                       }}
                    />
                    <Button buttonDivWrapper={s.searchRow_allProductsBtn} onClick={() => {
                    }}>
                        Все товары
                    </Button>
                    <Button onClick={snstt}>
                        Неотсортированные
                    </Button>
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
    )
}