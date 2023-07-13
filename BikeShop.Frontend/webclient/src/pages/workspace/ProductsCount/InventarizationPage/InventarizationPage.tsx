import React, {useEffect} from 'react'
import s from "../ProductsCountStyles.module.scss"
import {AsyncSelectSearchProduct, Button, UniTable} from "../../../../shared/ui"
import {useInventarization} from "./InventarizationPageStore"
import {slaveColumns} from "./models/SlaveTableColumns"
import {CatalogAPI, InventarizationAPI, LocalStorage} from "../../../../entities"
import {MasterTableColumns} from "./models/MasterTableColumns"
import {useSnackbar} from "notistack";
import {
    BarcodeScannerListenerProvider
} from 'app/providers/BarcodeScannerListenerProvider/BarcodeScannerListenerProvider'

export const InventarizationPage = () => {
    const {enqueueSnackbar} = useSnackbar()
    const currentInventarization = useInventarization(s => s.currentInventarization)
    const setProducts = useInventarization(s => s.setProducts)
    const toInvStorage = useInventarization(s => s.toInvStorage)
    const updateToIv = useInventarization(s => s.updateToIv)
    const selectedM = useInventarization(s => s.selectedM)
    const setSelectedM = useInventarization(s => s.setSelectedM)
    const addedHistory = useInventarization(s => s.addedHistory)
    const addProduct = useInventarization(s => s.addProduct)

    const selectedS = useInventarization(s => s.selectedS)
    const setSelectedS = useInventarization(s => s.setSelectedS)

    const saveInventarizationActHandler = () => {
        let data = {
            ...currentInventarization,
            inventarization: {
                ...currentInventarization.inventarization,
                user: LocalStorage.userId()
            }
        }
        console.log(data)
        InventarizationAPI.update(data).then(() => {
            enqueueSnackbar('Ивентаризация обновлена', {variant: 'success', autoHideDuration: 3000})

        })
    }

    const onBarcodeHandler = (lastBarcode: string) => {
        enqueueSnackbar(`Штрихкод ${lastBarcode}`, {variant: 'default', autoHideDuration: 3000})
        if (lastBarcode === '') return
        CatalogAPI.getProductByBarcode(lastBarcode).then(n => {
            addProduct(n.data)
            enqueueSnackbar('Товар добавлен', {variant: 'success', autoHideDuration: 3000})
        }).catch(() => {
            enqueueSnackbar('Товар не найден', {variant: 'warning', autoHideDuration: 5000})
        })
    }

    useEffect(() => {
        updateToIv()
    }, [])

    return (
        <BarcodeScannerListenerProvider onBarcodeRead={onBarcodeHandler}>
            <div className={s.arrivalOfProducts_mainBlock}>
                <div className={s.arrivalOfProducts_leftSide}>
                    <div className={s.leftSide_title}>
                        {`Инвентаризация №${currentInventarization.inventarization.id}`}
                    </div>
                    <Button buttonDivWrapper={s.button_chooseItem}
                            onClick={() => {
                                setSelectedM(toInvStorage[0])
                            }}
                    >
                        Выбрать товар
                    </Button>
                    <AsyncSelectSearchProduct onSelect={addProduct}/>
                    <div className={s.history}>
                        {[...addedHistory].reverse().map((p, index) => {
                            return (<div className={s.hist_item} key={index}>{p.name}</div>)
                        })}
                    </div>
                    <div className={s.leftSide_metrika}>
                        <div className={s.metrika_title}>Осталось:</div>
                        <div>Позиций: {toInvStorage.length}</div>
                    </div>
                    <div className={s.leftSide_metrika}>
                        <div className={s.metrika_title}>Пробито:</div>
                        <div>Позиций: {currentInventarization.products.length}</div>
                    </div>
                    <div className={s.leftSide_footerButtons}>
                        <Button buttonDivWrapper={s.button_cancel}
                                onClick={() => {
                                }}
                        >
                            Отмена
                        </Button>
                        <Button buttonDivWrapper={s.button_save}
                                onClick={saveInventarizationActHandler}
                        >
                            Сохранить акт
                        </Button>
                    </div>
                </div>

                <div className={s.inventoryOfProducts_rightSide}>
                    <UniTable rows={toInvStorage.slice(0, 1000)}
                              columns={MasterTableColumns}
                              setRows={setProducts}
                              rowOnDoubleClick={(r: any) => {
                                  addProduct(r)
                              }}
                              selected={[selectedM]}
                              setSelected={(v) => {
                                  setSelectedM(v[0])
                                  let l = currentInventarization.products.find(n => n.productId === v[0].id)
                                  setSelectedS(l ? l : null)


                                  //setShareSelected(v[0].productId)
                                  //handler()
                              }}
                              rowOnClick={(d) => {
                                  //setShareSelected((d as Product).id)
                              }}
                    />
                    <UniTable rows={currentInventarization.products}
                              columns={slaveColumns}
                              setRows={setProducts}
                              selected={[selectedS!]}
                              setSelected={(v) => {
                                  setSelectedS(v[0])
                                  setSelectedM(toInvStorage.find(n => n.id === v[0].productId))
                              }}
                              rowOnClick={(d) => {
                                  //setShareSelected((d as InventarizationProduct).productId)
                              }}
                    />
                </div>
            </div>
        </BarcodeScannerListenerProvider>
    )
}