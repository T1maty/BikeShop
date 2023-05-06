import React, {ChangeEvent, useState} from 'react'
import s from '../ProductsCountStyles.module.scss'
import {Button, CustomInput, EditableSpan, UniTable} from '../../../../shared/ui'
import {columns} from './SupplyInvoiceTableConfig'
import {ChooseProductModal} from '../../../../features'
import useSupplyInvoice from './models/SupplyInvoiceStore'
import Enumerable from 'linq'
import {SupplyInvoiceDTO} from '../../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO'
import {ProductQuantity, SupplyInvoiceAPI, useCurrency} from '../../../../entities'
import {SupplyInvoiceProduct} from '../../../../entities/entities/Acts/SupplyInvoice/SupplyInvoiceProduct'
import {useSnackbar} from "notistack"

export const SupplyInvoice = () => {
    const {enqueueSnackbar} = useSnackbar()

    const [vis, setVis] = useState(false)

    const currentSupplyInvoice = useSupplyInvoice(s => s.currentSupplyInvoice)
    const setCurrentSupplyInvoice = useSupplyInvoice(s => s.setCurrentSupplyInvoice)
    const isCreating = useSupplyInvoice(s => s.isCreating)
    const setIsCreating = useSupplyInvoice(s => s.setIsCreating)
    const setProducts = useSupplyInvoice(s => s.setProducts)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const fstb = useCurrency(s => s.fromSelectedToBase)
    const r = useCurrency(s => s.roundUp)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)
        }
    }

    return (
        <div className={s.arrivalOfProducts_mainBlock}>
            <div className={s.arrivalOfProducts_leftSide}>
                <div className={s.leftSide_title}>
                    {isCreating ? 'Новый приход товара' : "Приход номер " + currentSupplyInvoice.supplyInvoice.id}
                </div>

                <div className={s.leftSide_uploadFile}>
                    <input type="file" id="file" onChange={uploadHandler} className={s.inputFile}/>
                </div>


                <div className={s.leftSide_info}>
                    <CustomInput
                        placeholder={"Дополнительная информация"}
                        value={currentSupplyInvoice.supplyInvoice.description}
                        onChange={(value) => {
                            setCurrentSupplyInvoice({
                                ...currentSupplyInvoice,
                                supplyInvoice: {...currentSupplyInvoice.supplyInvoice, description: value.target.value}
                            })
                        }}
                    /></div>
                <Button buttonDivWrapper={s.button_chooseItem}
                        onClick={() => {
                            setVis(true)
                        }}
                >
                    Выбрать товар
                </Button>
                <div className={s.leftSide_delivery}>
                    <EditableSpan title={r(currentSupplyInvoice.supplyInvoice.deliveryPrice * fbts.c)}
                                  onChangeInput={(value) => {
                                      setCurrentSupplyInvoice({
                                          ...currentSupplyInvoice,
                                          supplyInvoice: {
                                              ...currentSupplyInvoice.supplyInvoice,
                                              deliveryPrice: parseFloat(value) * fstb.c
                                          }
                                      })
                                  }}/>
                    {fbts.s}
                    <EditableSpan title={r(currentSupplyInvoice.supplyInvoice.additionalPrice * fbts.c)}
                                  onChangeInput={(value) => {
                                      setCurrentSupplyInvoice({
                                          ...currentSupplyInvoice,
                                          supplyInvoice: {
                                              ...currentSupplyInvoice.supplyInvoice,
                                              additionalPrice: parseFloat(value) * fstb.c
                                          }
                                      })
                                  }}/>
                    {fbts.s}
                </div>
                <div className={s.leftSide_metrika}>
                    <div className={s.metrika_title}>Метрика:</div>
                    <div>Позиций: {currentSupplyInvoice.supplyInvoiceProducts?.length}</div>
                    <div>Единиц: {Enumerable.from(currentSupplyInvoice.supplyInvoiceProducts).select(n => n.quantity).sum()}</div>
                    <div>Приходная сумма:
                        {Enumerable.from(currentSupplyInvoice.supplyInvoiceProducts).select(n => n.total).sum()}
                    </div>
                    <div>Расходы: 99</div>
                    <div>Итого: 99999999</div>
                </div>
                <div className={s.leftSide_footerButtons}>
                    <Button buttonDivWrapper={s.button_save}
                            onClick={() => {
                                let data = {
                                    ...currentSupplyInvoice,
                                    supplyInvoice: {
                                        ...currentSupplyInvoice.supplyInvoice,
                                        user: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
                                    }
                                }
                                console.log(data)

                                if (isCreating) {
                                    SupplyInvoiceAPI.create(data).then((r: any) => {
                                        enqueueSnackbar('Накладная создана!', {
                                            variant: 'success',
                                            autoHideDuration: 3000
                                        })
                                        setIsCreating(false)
                                        setCurrentSupplyInvoice(r.data)
                                        console.log(r)
                                    }).catch((r: any) => {
                                        console.log(r)
                                    })
                                } else {
                                    SupplyInvoiceAPI.update(data).then((r: any) => {
                                        enqueueSnackbar('Накладная сохранена!', {
                                            variant: 'success',
                                            autoHideDuration: 3000
                                        })
                                        setCurrentSupplyInvoice(r.data)
                                        console.log(r)
                                    }).catch((r: any) => {
                                        enqueueSnackbar('Ошибка сервера!', {variant: 'error', autoHideDuration: 3000})

                                        console.log(r)
                                    })
                                }
                            }}
                    >
                        Сохранить акт
                    </Button>
                    <Button buttonDivWrapper={s.button_cancel}
                            onClick={() => {
                                setCurrentSupplyInvoice({
                                    supplyInvoiceProducts: [], supplyInvoice: {
                                        shopId: 1,
                                        user: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                                        description: '',
                                    }
                                } as unknown as SupplyInvoiceDTO)
                                setIsCreating(true)
                            }}
                    >
                        Отмена
                    </Button>
                </div>
            </div>

            <div className={s.arrivalOfProducts_rightSide}>

                <ChooseProductModal slaveColumns={columns}
                                    setDataSlaveTable={setProducts}
                                    data={currentSupplyInvoice.supplyInvoiceProducts} open={vis}
                                    addData={(value: any) => {
                                        let n = value as ProductQuantity
                                        let finded = false
                                        let newData = currentSupplyInvoice.supplyInvoiceProducts.map((np: SupplyInvoiceProduct) => {
                                            if (n.id === np.productId) {
                                                finded = true
                                                return ({...np, quantity: np.quantity + 1})
                                            } else return np
                                        })
                                        if (!finded) newData.push({
                                            supplyInvoiceId: 0,
                                            productId: n.id,
                                            name: n.name,
                                            description: '',
                                            catalogKey: n.catalogKey,
                                            barcode: n.barcode,
                                            manufBarcode: n.manufacturerBarcode ? n.manufacturerBarcode : '',
                                            quantityUnitName: n.quantityUnitName,
                                            incomePrice: n.incomePrice,
                                            brandName: 'No',
                                            quantity: 1,
                                            total: n.incomePrice * n.quantity,
                                            id: 0,
                                            createdAt: Date.now().toString(),
                                            updatedAt: Date.now().toString(),
                                            enabled: true
                                        } as SupplyInvoiceProduct)
                                        setProducts(newData)
                                    }}
                                    setOpen={setVis}/>
                <UniTable rows={currentSupplyInvoice.supplyInvoiceProducts}
                          columns={columns}
                          setRows={setProducts}
                />

            </div>
        </div>
    )
}