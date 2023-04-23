import React, {useEffect} from 'react';
import s from "../ProductsCount/ProductsWrapper.module.scss";
import {Button, UniTable} from "../../../shared/ui";
import {useInventarization} from "./InventarizationPageStore";
import {ProductCatalogTable} from "../../../widgets";

export const InventarizationPage = () => {

    const currentInventarization = useInventarization(s => s.currentInventarization)
    const setInventariazation = useInventarization(s => s.setInventariazation)

    useEffect(() => {

    }, [])

    return (
        <div className={s.arrivalOfProducts_mainBlock}>
            <div className={s.arrivalOfProducts_leftSide}>
                <div className={s.leftSide_title}>
                    {`Инвентаризация №${1}`}
                </div>

                <div className={s.leftSide_info}>Дополнительная информация</div>
                <Button buttonDivWrapper={s.button_chooseItem}
                        onClick={() => {
                            //setVis(true)
                        }}
                >
                    Выбрать товар
                </Button>
                <div className={s.leftSide_delivery}>
                    <div>Доставка</div>
                    <div>Расходы</div>
                </div>
                <div className={s.leftSide_metrika}>
                    <div className={s.metrika_title}>Метрика:</div>
                    <div>Позиций: {}</div>
                    <div>Единиц: {}</div>
                    <div>Приходная сумма:
                        {}
                    </div>
                    <div>Расходы: 99</div>
                    <div>Итого: 99999999</div>
                </div>
                <div className={s.leftSide_footerButtons}>
                    <Button buttonDivWrapper={s.button_save}
                            onClick={() => {
                            }}
                    >
                        Сохранить акт
                    </Button>
                    <Button buttonDivWrapper={s.button_cancel}
                            onClick={() => {
                            }}
                    >
                        Отмена
                    </Button>
                </div>
            </div>

            <div className={s.arrivalOfProducts_rightSide}>
                <ProductCatalogTable/>
                <br/>
                <UniTable rows={currentInventarization.products} columns={[]}/>

            </div>
        </div>
    );
};