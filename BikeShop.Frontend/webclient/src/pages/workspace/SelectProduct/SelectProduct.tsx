import React from 'react';
import s from './SelectProduct.module.scss'
import {Button, InputUI} from "../../../shared/ui";

const SelectProduct = () => {
    return (
        <div className={s.selectProduct_mainBox}>
            <div className={s.selectProduct_mainBox_leftSide}>
                <div className={s.leftSide_header}>
                    1
                </div>
                <div className={s.leftSide_treeView}>
                    2
                </div>
                <div className={s.leftSide_buttons}>
                    <div>
                        <Button onClick={() => {}}>
                            Подтвердить
                        </Button>
                    </div>
                    <div>
                        <Button onClick={() => {}}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>


            <div className={s.selectProduct_mainBox_rightSide}>
                <div className={s.rightSide_availableProducts}>
                    Таблица доступных товаров
                </div>
                <div className={s.rightSide_infoRow}>
                    <div className={s.infoRow_searchField}>
                        <InputUI placeholder={'Поиск...'} clearInputValue={() => {}}/>
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
                    Таблица выбранных товаров
                </div>
            </div>
        </div>
    )
}

export default SelectProduct;