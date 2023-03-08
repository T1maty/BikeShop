import React from 'react'
import s from './SelectProductWork.module.scss'
import {Button, InputUI} from '../../../shared/ui'
import {IProductExtended} from "../../../entities";
import SlaveTable from "./SlaveTable";
import {ProductCatalogTable, ProductTagCloud, TagTreeView} from "../../../widgets";
import useSelectProduct from "./SelectProductStore";

interface SelectProductProps {
    products: IProductExtended[]
}

export const SelectProduct = (props: SelectProductProps) => {

    const slaveTableRows = useSelectProduct(s => s.slaveTableRows);
    const addSlaveTableProduct = useSelectProduct(s => s.addProduct);
    const setSlaveTableProducts = useSelectProduct(s => s.setSlaveTableRows);

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
                            setSlaveTableProducts([])
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
                    <ProductCatalogTable onRowDoubleClick={addSlaveTableProduct}/>
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
                    <SlaveTable rows={slaveTableRows}/>
                </div>
            </div>
        </div>
    )
}