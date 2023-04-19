import React, {ChangeEvent, useState} from 'react'
import s from '../ProductsCount/ProductsWrapper.module.scss'
import {Button, UniTable} from "../../../shared/ui";
import {columns} from "./SupplyInvoiceTableConfig";
import {ChooseProductModal} from "../../../features";
import useSupplyInvoice from "./models/SupplyInvoiceStore";
import Enumerable from "linq";
import {SupplyInvoiceDTO} from "../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO";
import {SupplyInvoiceAPI} from "../../../entities/api/Acts/SupplyInvoiceAPI";

export const ArrivalOfProducts = () => {

    const [data, setData] = useState<any[]>([]);
    const {visible, setVisible} = useSupplyInvoice(s => s);
    const [vis, setVis] = useState(false)

    const currentSupplyInvoice = useSupplyInvoice(s => s.currentSupplyInvoice)
    const setCurrentSupplyInvoice = useSupplyInvoice(s => s.setCurrentSupplyInvoice)
    const isCreating = useSupplyInvoice(s => s.isCreating)
    const setIsCreating = useSupplyInvoice(s => s.setIsCreating)
    const setProducts = useSupplyInvoice(s => s.setProducts)


    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)
        }
    }

    return (
        <div className={s.arrivalOfProducts_mainBlock}>


            <div className={s.arrivalOfProducts_leftSide}>

                <div
                    className={s.leftSide_title}>{isCreating ? "Новый приход товара" : currentSupplyInvoice.supplyInvoice.id}</div>
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
                    <div>Позиций: {currentSupplyInvoice.supplyInvoiceProducts?.length}</div>
                    <div>Единиц: {Enumerable.from(currentSupplyInvoice.supplyInvoiceProducts).select(n => n.quantity).sum()}</div>
                    <div>Приходная
                        сумма: {Enumerable.from(currentSupplyInvoice.supplyInvoiceProducts).select(n => n.total).sum()}</div>
                    <div>Расходы: 99</div>
                    <div>Итого: 99999999</div>
                </div>
                <div className={s.leftSide_footerButtons}>
                    <Button buttonDivWrapper={s.button_save} onClick={() => {
                        let data = {
                            ...currentSupplyInvoice,
                            supplyInvoice: {
                                ...currentSupplyInvoice.supplyInvoice,
                                user: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                        console.log(data)

                        if (isCreating) {
                            SupplyInvoiceAPI.create(data).then((r: any) => {
                                console.log(r)
                            }).catch((r: any) => {
                                console.log(r)
                            })
                        } else {
                            SupplyInvoiceAPI.update(data).then((r: any) => {
                                console.log(r)
                            }).catch((r: any) => {
                                console.log(r)
                            })
                        }


                    }}>
                        Сохранить акт
                    </Button>
                    <Button buttonDivWrapper={s.button_cancel} onClick={() => {
                        setCurrentSupplyInvoice({supplyInvoiceProducts: []} as unknown as SupplyInvoiceDTO)
                        setIsCreating(true)
                    }}>
                        Отмена
                    </Button>
                </div>
            </div>

            <div className={s.arrivalOfProducts_rightSide}>

                <ChooseProductModal slaveColumns={columns}
                                    data={currentSupplyInvoice.supplyInvoiceProducts} open={vis}
                                    setData={setProducts}
                                    setOpen={setVis}/>
                <UniTable rows={currentSupplyInvoice.supplyInvoiceProducts} columns={columns} setRows={setData}/>

            </div>
        </div>

    );
};