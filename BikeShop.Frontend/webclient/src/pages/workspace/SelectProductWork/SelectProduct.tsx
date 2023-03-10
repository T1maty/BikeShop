import React from 'react'
import s from './SelectProductWork.module.scss'
import {Button, InputUI} from '../../../shared/ui'
import SlaveTable from "./SlaveTable";
import {ProductCatalogTable, ProductTagCloud, TagTreeView} from "../../../widgets";
import useSelectProduct from "./SelectProductStore";
import {ServiceItemProduct} from "../../../entities/models/ServiceItem";

interface SelectProductProps {
    products: ServiceItemProduct[]
    addProduct: (product: ServiceItemProduct) => void
}

export const SelectProduct = (props: SelectProductProps) => {


    const conv = useSelectProduct(s => s.convert);

    return (
        <div className={s.selectProduct_mainBox}>
            <div className={s.selectProduct_mainBox_leftSide}>
                <div className={s.leftSide_header}>
                    <ProductTagCloud/>
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
                        }}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>

            <div className={s.selectProduct_mainBox_rightSide}>
                <div className={s.rightSide_availableProducts}>
                    <ProductCatalogTable onRowDoubleClick={(product) => {
                        props.addProduct(conv(product))
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
                    <SlaveTable rows={props.products}/>
                </div>
            </div>
        </div>
    )
}