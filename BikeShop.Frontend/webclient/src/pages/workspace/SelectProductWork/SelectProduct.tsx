import React from 'react'
import s from './SelectProductWork.module.scss'
import {AsyncSelectSearchProduct, Button, UniTable} from '../../../shared/ui'
import {TagTreeView} from "../../../widgets"
import useSelectProduct from "./SelectProductStore"
import {columns} from "./SlaveTableConfig"
import {ServiceProduct} from "../../../entities"
import useSelectProductWorkModal
    from "../../../features/ServiceFeatures/SelectProductWorkModals/SelectProductWorkModalStore"
import {Product} from "entities"
import CatTable from "../../../widgets/workspace/ProductCatalog/ProductCatalogTable/CatTable";

interface SelectProductProps {
    products: ServiceProduct[]
    setProducts: (product: ServiceProduct[]) => void
    defaultMasterId: string
}

export const SelectProduct = (props: SelectProductProps) => {

    const setOpenSelectProductModal = useSelectProductWorkModal(s => s.setOpenSelectProductModal)
    const conv = useSelectProduct(s => s.convert)

    const addProductHandler = (product: Product) => {
        let prods = props.products
        let actual = prods.find(n => n.productId === product.id)
        if (actual != undefined) {
            actual.quantity++
        } else {
            let item = conv(product, props.defaultMasterId)
            item.quantity = 1
            prods.push(item)
        }
        props.setProducts(prods)
    }

    return (
        <div className={s.selectProduct_mainBox}>
            <div className={s.selectProduct_mainBox_leftSide}>
                <div className={s.leftSide_header}>

                </div>
                <div className={s.leftSide_treeView}>
                    <TagTreeView/>
                </div>
                <div className={s.leftSide_buttons}>
                    <div>
                        <Button onClick={() => {
                        }}>
                            Подтвердить
                        </Button>
                    </div>
                    <div>
                        <Button onClick={() => {
                            setOpenSelectProductModal(false)
                        }}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>

            <div className={s.selectProduct_mainBox_rightSide}>
                <div className={s.rightSide_availableProducts}>
                    <CatTable onRowDoubleClick={addProductHandler}/>
                </div>
                <div className={s.rightSide_infoRow}>
                    <div className={s.infoRow_searchField}>
                        <AsyncSelectSearchProduct onSelect={addProductHandler}/>
                    </div>
                    <div className={s.infoRow_result}>
                        <div className={s.result_sum}>
                            Скидка1
                        </div>
                        <div className={s.result_sum}>
                            Скидка2
                        </div>
                        <div className={s.result_sum}>
                            Скидка3
                        </div>
                    </div>
                </div>
                <div className={s.rightSide_chosenProducts}>
                    <UniTable rows={props.products}
                              columns={columns}
                              setRows={props.setProducts}
                    />
                </div>
            </div>
        </div>
    )
}