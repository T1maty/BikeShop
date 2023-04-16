import React, {ChangeEvent, useState} from 'react'
import s from '../ProductsCount/ProductsWrapper.module.scss'
import {Button, UniTable} from "../../../shared/ui";
import {columns} from "./SupplyInvoiceTableConfig";
import {ChooseProductModal} from "../../../features";
import {SupplyInvoiceCreateModel} from "./models/SupplyInvoiceCreateModel";
import {ProductExtended} from "../../../entities";
import {$api} from "../../../shared";

export const ArrivalOfProducts = () => {

    const [data, setData] = useState<any[]>([]);
    const [vis, setVis] = useState(false);
    const [isCreating, setIsCreating] = useState(false);


    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)
        }
    }

    return (
        <div className={s.arrivalOfProducts_mainBlock}>


            <div className={s.arrivalOfProducts_leftSide}>
                <div className={s.leftSide_title}>Новый приход товара</div>
                {
                    false ?
                        <div className={s.leftSide_uploadFile}>
                            <input type='file' id='file' onChange={uploadHandler} className={s.inputFile}/>
                        </div>
                        : ''
                }
                <div className={s.leftSide_info}>Дополнительная информация</div>
                <Button buttonDivWrapper={s.button_chooseItem} onClick={() => {
                    setVis(true)
                }}>
                    Выбрать товар
                </Button>
                <div className={s.leftSide_delivery}>
                    <div>Доставка</div>
                    <div>Расходы</div>
                </div>
                <div className={s.leftSide_metrika}>
                    <div className={s.metrika_title}>Метрика:</div>
                    <div>Позиций: 999</div>
                    <div>Товаров: 999</div>
                    <div>Приходная сумма: 99999</div>
                    <div>Расходы: 99</div>
                    <div>Итого: 99999999</div>
                </div>
                <div className={s.leftSide_footerButtons}>
                    <Button buttonDivWrapper={s.button_save} onClick={() => {
                        let dataS: SupplyInvoiceCreateModel = {
                            supplyInvoiceProducts: data as unknown as ProductExtended[],
                            supplyInvoice: {
                                shopId: 1,
                                user: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                description: "string"
                            }
                        }
                        console.log(dataS)
                        $api.post('/supplyinvoice/create', dataS).then((r) => {
                            console.log(r)
                        }).catch((r) => {
                            console.log(r)
                        })

                    }}>
                        Сохранить акт
                    </Button>
                    <Button buttonDivWrapper={s.button_cancel} onClick={() => {
                    }}>
                        Отмена
                    </Button>
                </div>
            </div>

            <div className={s.arrivalOfProducts_rightSide}>

                <ChooseProductModal setDataSlaveTable={setData} slaveColumns={columns} data={data} open={vis}
                                    setData={setData}
                                    setOpen={setVis}/>
                <UniTable rows={data} columns={columns} setRows={setData}/>

            </div>
        </div>

    );
};