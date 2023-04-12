import React, {useState} from 'react'
import s from './SelectProductWork.module.scss'
import {Button, InputUI, UniTable} from '../../../shared/ui'
import {ProductCatalogTable, ProductTagCloud, TagTreeView} from "../../../widgets";
import useSelectProduct from "./SelectProductStore";
import {ServiceItemProduct} from "../../../entities/models/Service/ServiceItem";
import {columns} from "./SlaveTableConfig";
import {ProductTag} from "../../../entities";

interface SelectProductProps {
    products: ServiceItemProduct[]
    setProducts: (product: ServiceItemProduct[]) => void
}

export const SelectProduct = (props: SelectProductProps) => {

    const [tags, setTags] = useState<ProductTag[]>([])

    const conv = useSelectProduct(s => s.convert);

    return (
        <div className={s.selectProduct_mainBox}>
            <div className={s.selectProduct_mainBox_leftSide}>
                <div className={s.leftSide_header}>
                    <ProductTagCloud tags={tags} setTags={setTags}/>
                </div>
                <div className={s.leftSide_treeView}>
                    <TagTreeView tags={tags} setTags={setTags}/>
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
                        }}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>

            <div className={s.selectProduct_mainBox_rightSide}>
                <div className={s.rightSide_availableProducts}>
                    <ProductCatalogTable onRowDoubleClick={(product) => {
                        let prods = props.products
                        let actual = prods.find(n => n.productId === product.id)
                        if (actual != undefined) {
                            actual.quantity++
                        } else {
                            let item = conv(product)
                            item.quantity = 1
                            prods.push(item)
                        }
                        props.setProducts(prods)
                    }}/>
                </div>
                <div className={s.rightSide_infoRow}>
                    <div className={s.infoRow_searchField}>
                        <InputUI placeholder={'Поиск...'} clearInputValue={() => {
                        }}/>
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
                    <UniTable rows={props.products} columns={columns} setRows={props.setProducts}/>
                </div>
            </div>
        </div>
    )
}