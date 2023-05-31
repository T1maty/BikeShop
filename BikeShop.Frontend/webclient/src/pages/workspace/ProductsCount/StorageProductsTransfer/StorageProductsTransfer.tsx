import React, {useEffect, useState} from 'react'
import s from '../ProductsCountStyles.module.scss'
import {AsyncSelectSearchProduct, Button, CustomInput, UniTable} from '../../../../shared/ui'
import {ChooseProductModal} from '../../../../features'
import Select from 'react-select'
import Enumerable from 'linq'
import {columns} from "./StorageProductTransferTableConfig"
import {selectColorStyles} from '../../../../app/styles/variables/selectColorStyles'
import {useProsuctStorageTransfer} from "./StorageProductTtransferStore";
import {useSnackbar} from "notistack";

export const StorageProductsTransfer = () => {

    const [vis, setVis] = useState(false)
    const {enqueueSnackbar} = useSnackbar()

    const storages = useProsuctStorageTransfer(s => s.storages)
    const getStorages = useProsuctStorageTransfer(s => s.getStorages)

    const selectedStorageForTransferFrom = useProsuctStorageTransfer(s => s.selectedStorageForTransferFrom)
    const setSelectedStorageForTransferFrom = useProsuctStorageTransfer(s => s.setSelectedStorageForTransferFrom)
    const selectedStorageForTransferTo = useProsuctStorageTransfer(s => s.selectedStorageForTransferTo)
    const setSelectedStorageForTransferTo = useProsuctStorageTransfer(s => s.setSelectedStorageForTransferTo)

    const current = useProsuctStorageTransfer(s => s.currentMove)
    const setCurrentProducts = useProsuctStorageTransfer(s => s.setCurrentProducts)
    const addProduct = useProsuctStorageTransfer(s => s.addProduct)
    const setDescription = useProsuctStorageTransfer(s => s.setDescription)

    const isCreating = useProsuctStorageTransfer(s => s.isCreating)

    const saveHandler = useProsuctStorageTransfer(s => s.saveHandler)
    const clearCurrent = useProsuctStorageTransfer(s => s.clearCurrent)

    useEffect(() => {
        getStorages()
    }, [])

    return (
        <div className={s.arrivalOfProducts_mainBlock}>
            <div className={s.arrivalOfProducts_leftSide}>
                <div className={s.leftSide_title}>
                    {isCreating ? 'Новый акт перемещения' : current.productMove.id}
                </div>
                <div style={{color: 'black'}}>
                    <Select
                        className={s.options_search}
                        placeholder={'Со склада'}
                        isSearchable={false}
                        options={storages.filter(n => n.id != selectedStorageForTransferTo?.id)}
                        value={selectedStorageForTransferFrom}
                        onChange={(v) => {
                            setSelectedStorageForTransferFrom(v!.id)
                        }}
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
                        options={storages.filter(n => n.id != selectedStorageForTransferFrom?.id)}
                        value={selectedStorageForTransferTo}
                        onChange={(v) => {
                            setSelectedStorageForTransferTo(v!.id)
                        }}
                        getOptionLabel={label => label.name}
                        getOptionValue={value => value.name}
                        styles={selectColorStyles}
                    />
                </div>
                <div className={s.leftSide_info}>
                    <CustomInput placeholder={'Опис'} value={current.productMove.description} onChange={(n) => {
                        setDescription(n.target.value)
                    }}/>
                </div>
                <Button buttonDivWrapper={s.button_chooseItem}
                        onClick={() => {
                            setVis(true)
                        }}
                >
                    Выбрать товар
                </Button>
                <div className={s.leftSide_search}>
                    <AsyncSelectSearchProduct onSelect={addProduct}/>
                </div>
                <div className={s.leftSide_metrika}>
                    <div className={s.metrika_title}>Метрика:</div>
                    <div>Позиций: {current.products?.length}</div>
                    <div>Единиц: {Enumerable.from(current.products).select(n => n.quantity).sum()}</div>
                </div>
                <div className={s.leftSide_footerButtons}>
                    <Button buttonDivWrapper={s.button_save}
                            onClick={() => {
                                saveHandler(() => {
                                    enqueueSnackbar('Операция выполнена', {variant: 'success', autoHideDuration: 3000})
                                }, () => {
                                    enqueueSnackbar('Ошибка сервара', {variant: 'error', autoHideDuration: 3000})

                                })
                            }}
                    >
                        Сохранить акт
                    </Button>
                    <Button buttonDivWrapper={s.button_cancel}
                            onClick={clearCurrent}
                    >
                        Отмена
                    </Button>
                </div>
            </div>

            <div className={s.arrivalOfProducts_rightSide}>

                <ChooseProductModal slaveColumns={columns}
                                    setDataSlaveTable={setCurrentProducts}
                                    data={current.products} open={vis}
                                    addData={addProduct}
                                    setOpen={setVis}/>
                <UniTable rows={current.products}
                          columns={columns}
                          setRows={setCurrentProducts}
                />

            </div>
        </div>
    )
}