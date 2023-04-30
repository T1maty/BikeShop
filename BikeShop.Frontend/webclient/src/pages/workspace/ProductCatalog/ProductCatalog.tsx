import React, {useEffect, useState} from 'react'
import {ProductCatalogTable, ProductTagCloud, TagTreeView} from "../../../widgets"
import {AsyncSelectSearchProduct, Button} from '../../../shared/ui'
import s from './ProductCatalog.module.scss'
import useEditProductCardModal
    from "../../../features/ProductCatalogFeatures/EditProductCardModal/EditProductCardModalStore"
import {EditProductCardModal} from "../../../features"
import {useSnackbar} from "notistack"
import {ProductTag} from "../../../entities"
import useProductCatalogTableStore
    from "../../../widgets/workspace/ProductCatalog/ProductCatalogTable/ProductCatalogTableStore"
import useCreateStorageModal from '../../../features/CRUDModals/CreateStorageModal/CreateStorageModalStore'
import Select from 'react-select'

export const ProductCatalog = () => {

    const {enqueueSnackbar} = useSnackbar()

    const getProductCard = useEditProductCardModal(s => s.getProductCard)
    const isError = useEditProductCardModal(s => s.isError)
    const setNotSortedToTable = useProductCatalogTableStore(s => s.setNotSortedToTable)

    const storages = useCreateStorageModal(s => s.storages)
    const getStorages = useCreateStorageModal(s => s.getStorages)
    const currentStorage = useCreateStorageModal(s => s.currentStorage)
    const setCurrentStorage = useCreateStorageModal(s => s.setCurrentStorage)

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

    useEffect(() => {
        getStorages()
    }, [])

    return (
        <div className={s.productCatalogTable_mainBlock}>
            <EditProductCardModal/>

            <div className={s.productCatalogTable_leftSide}>
                <div className={s.leftSide_header}>
                    <ProductTagCloud tags={tags} setTags={setTags}/>
                </div>
                <div className={s.leftSide_tree}>
                    <TagTreeView tags={tags} setTags={setTags}/>
                </div>
            </div>

            <div className={s.productCatalogTable_rightSide}>
                <div className={s.rightSide_searchRow}>
                    <Button onClick={() => {}}>
                        Отображение
                    </Button>
                    <div className={s.searchRow_searchInput}>
                        <AsyncSelectSearchProduct/>
                    </div>
                    <div style={{color: 'black'}}>
                        <Select
                            className={s.options_search}
                            placeholder={'Склад'}
                            isSearchable={false}
                            options={storages}
                            // defaultValue={storages[0].id}
                            value={currentStorage}
                            onChange={(v) => { // @ts-ignore
                                setCurrentStorage(v!.id)}}
                            getOptionLabel={label => label.name}
                            // getOptionValue={value => value.name}
                        />
                    </div>
                    <Button onClick={() => {}}>
                        Все товары
                    </Button>
                    <Button onClick={setNotSortedToTable}>
                        Неотсортированные
                    </Button>
                </div>

                <div className={s.rightSide_table}
                     onContextMenu={(event) => {event.preventDefault()}}
                >
                    <ProductCatalogTable onRowDoubleClick={(row: any) => {getProductCard(row.id)}}/>
                </div>
            </div>
        </div>
    )
}