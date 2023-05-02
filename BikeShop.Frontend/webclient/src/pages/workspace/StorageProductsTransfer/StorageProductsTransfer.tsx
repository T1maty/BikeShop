import React, {ChangeEvent, useEffect, useState} from 'react'
import s from '../ProductsCount/ProductsWrapper.module.scss'
import {AsyncSelectSearchProduct, Button, UniTable} from '../../../shared/ui'
import {ChooseProductModal} from '../../../features'
import Select from 'react-select'
import Enumerable from 'linq'
import {SupplyInvoiceDTO} from '../../../entities/models/Acts/SupplyInvoice/SupplyInvoiceDTO'
import {ProductQuantity, SupplyInvoiceAPI} from '../../../entities'
import {SupplyInvoiceProduct} from '../../../entities/entities/Acts/SupplyInvoice/SupplyInvoiceProduct'
import useSupplyInvoice from "../SupplyInvoice/models/SupplyInvoiceStore"
import {columns} from "../SupplyInvoice/SupplyInvoiceTableConfig"
import {selectColorStyles} from '../../../app/styles/variables/selectColorStyles'
import useCreateStorageModal from '../../../features/CRUDModals/CreateStorageModal/CreateStorageModalStore'

export const StorageProductsTransfer = () => {

    const [vis, setVis] = useState(false)

    const storages = useCreateStorageModal(s => s.storages)
    const getStorages = useCreateStorageModal(s => s.getStorages)
    const selectedStorageForTransferFrom = useCreateStorageModal(s => s.selectedStorageForTransferFrom)
    const setSelectedStorageForTransferFrom = useCreateStorageModal(s => s.setSelectedStorageForTransferFrom)
    const selectedStorageForTransferTo = useCreateStorageModal(s => s.selectedStorageForTransferTo)
    const setSelectedStorageForTransferTo = useCreateStorageModal(s => s.setSelectedStorageForTransferTo)

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

    useEffect(() => {
        getStorages()
    }, [])

    return (
        <div className={s.arrivalOfProducts_mainBlock}>
            <div className={s.arrivalOfProducts_leftSide}>
                <div className={s.leftSide_title}>
                    {isCreating ? 'Новый акт перемещения' : currentSupplyInvoice.supplyInvoice.id}
                </div>
                {
                    false ?
                        <div className={s.leftSide_uploadFile}>
                            <input type="file" id="file" onChange={uploadHandler} className={s.inputFile}/>
                        </div>
                        : ''
                }
                <div style={{color: 'black'}}>
                    <Select
                        className={s.options_search}
                        placeholder={'Со склада'}
                        isSearchable={false}
                        options={storages}
                        value={selectedStorageForTransferFrom}
                        onChange={(v) => {setSelectedStorageForTransferFrom(v!.id)}}
                        getOptionLabel={label => label.name}
                        getOptionValue={value => value.name}
                        styles={selectColorStyles}
                    />
                </div>
                <div style={{color: 'black'}}>
                    <Select
                        className={s.options_search}
                        placeholder={'На склад'}
                        isSearchable={false}
                        options={storages}
                        value={selectedStorageForTransferTo}
                        onChange={(v) => {setSelectedStorageForTransferTo(v!.id)}}
                        getOptionLabel={label => label.name}
                        getOptionValue={value => value.name}
                        styles={selectColorStyles}
                    />
                </div>
                <div className={s.leftSide_info}>
                    Дополнительная информация
                </div>
                <Button buttonDivWrapper={s.button_chooseItem}
                        onClick={() => {setVis(true)}}
                >
                    Выбрать товар
                </Button>
                <div className={s.leftSide_search}>
                    <AsyncSelectSearchProduct onSelect={() => {}}/>
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
                                        setIsCreating(false)
                                        setCurrentSupplyInvoice(r.data)
                                        console.log(r)
                                    }).catch((r: any) => {
                                        console.log(r)
                                    })
                                } else {
                                    SupplyInvoiceAPI.update(data).then((r: any) => {
                                        setCurrentSupplyInvoice(r.data)
                                        console.log(r)
                                    }).catch((r: any) => {
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