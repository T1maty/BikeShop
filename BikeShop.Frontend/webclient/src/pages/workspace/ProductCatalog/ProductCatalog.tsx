import React, {useEffect, useState} from 'react'
import {ProductCatalogTable, ProductTagCloud, TagTreeView} from "../../../widgets"
import {AsyncSelectSearchProduct, Button} from '../../../shared/ui'
import s from './ProductCatalog.module.scss'
import useEditProductCardModal
    from "../../../features/ProductCatalogFeatures/EditProductCardModal/EditProductCardModalStore"
import {EditProductCardModal} from "../../../features"
import {useSnackbar} from "notistack"
import {ProductCardAPI, ProductTag} from '../../../entities'
import useProductCatalogTableStore
    from "../../../widgets/workspace/ProductCatalog/ProductCatalogTable/ProductCatalogTableStore"
import useCreateStorageModal from '../../../features/CRUDModals/CreateStorageModal/CreateStorageModalStore'
import Select from 'react-select'
import {selectColorStyles} from '../../../app/styles/variables/selectColorStyles'
import {useProductCatalogStorage} from "./ProductCatalogStorage"
import Enumerable from "linq";
import DisplayModal from "../../../features/ProductCatalogFeatures/DisplayModal";

export const ProductCatalog = () => {

    const {enqueueSnackbar} = useSnackbar()

    const getProductCard = useEditProductCardModal(s => s.getProductCard)
    const isError = useEditProductCardModal(s => s.isError)
    const storages = useCreateStorageModal(s => s.storages)
    const getStorages = useCreateStorageModal(s => s.getStorages)
    const selectedStorage = useCreateStorageModal(s => s.selectedStorage)
    const setSelectedStorage = useCreateStorageModal(s => s.setSelectedStorage)

    const loadStorageData = useProductCatalogStorage(s => s.loadStorageData)
    const setProductsToTable = useProductCatalogTableStore(s => s.getProducts)

    const storageData = useProductCatalogStorage(s => s.storageData)

    const [tags, setTags] = useState<ProductTag[]>([])
    const [displayModal, setDisplayModal] = useState(false)

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

    useEffect(() => {
        if (selectedStorage != undefined)
            loadStorageData(selectedStorage?.id.toString()!)
    }, [selectedStorage])

    return (
        <div className={s.productCatalogTable_mainBlock}>
            <EditProductCardModal/>
            <DisplayModal open={displayModal} setOpen={setDisplayModal}/>
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
                    <Button onClick={() => {
                        setDisplayModal(true)
                    }}>
                        Отображение
                    </Button>
                    <div className={s.searchRow_searchInput}>
                        <AsyncSelectSearchProduct onSelect={(p) => {
                            ProductCardAPI.getProductCardById(p.id).then(n => {
                                setProductsToTable(Enumerable.from(n.data.productTags).select(h => h.productTag.id).toArray())
                            })
                        }}/>
                    </div>
                    <div style={{color: 'black'}}>
                        <Select
                            className={s.options_search}
                            placeholder={'Склад'}
                            isSearchable={false}
                            options={storages}
                            value={selectedStorage}
                            onChange={(v) => {
                                setSelectedStorage(v!.id)
                            }}
                            getOptionLabel={label => label.name}
                            getOptionValue={value => value.name}
                            styles={selectColorStyles}
                        />
                    </div>
                </div>

                <div className={s.rightSide_table}
                     onContextMenu={(event) => {
                         event.preventDefault()
                     }}
                >
                    <ProductCatalogTable onRowDoubleClick={(row: any) => {
                        getProductCard(row.id)
                    }}/>
                </div>
            </div>
        </div>
    )
}