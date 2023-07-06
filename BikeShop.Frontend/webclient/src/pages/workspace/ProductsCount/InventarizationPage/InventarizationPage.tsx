import React, {useEffect, useState} from 'react'
import s from "../ProductsCountStyles.module.scss"
import {AsyncSelectSearchProduct, Button, UniTable} from "../../../../shared/ui"
import {useInventarization} from "./InventarizationPageStore"
import {slaveColumns} from "./models/SlaveTableColumns"
import {CatalogAPI, InventarizationAPI, InventarizationProduct, LocalStorage} from "../../../../entities"
import {MasterTableColumns} from "./models/MasterTableColumns"
import {useSnackbar} from "notistack";
import {Product} from "entities";
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


    const [selectedS, setSelectedS] = useState<InventarizationProduct>()

    const [shareSelected, setShareSelected] = useState<number>()

    useEffect(() => {
        setSelectedM(toInvStorage[0])
    }, [])

    const handler = () => {
        console.log(selectedM)
        console.log(selectedS)
        console.log(shareSelected)
        console.log('shareSelected')
        //setSelectedS(shareSelected)
        setSelectedM(toInvStorage[0])
    }

    const setInventarizationHandler = (r: Product) => {
        let exist = false
        let data = currentInventarization.products.map(n => {
            if (n.productId === r.id) {
                exist = true
                return {
                    ...n,
                    quantity: n.quantity + 1,
                    incomeTotal: n.incomePrice * n.quantity + 1,
                    retailTotal: n.retailPrice * n.quantity + 1,
                    dealerTotal: n.dealerPrice * n.quantity + 1
                }
            } else return n
        })
        if (exist) {
            setProducts(data)
        } else {
            let n = {
                id: 0,
                createdAt: Date.now().toLocaleString(),
                updatedAt: Date.now().toLocaleString(),
                enabled: true,
                inventariazationId: currentInventarization.inventarization.id,
                productId: r.id,
                name: r.name,
                description: '',
                catalogKey: r.catalogKey,
                barcode: r.barcode,
                manufBarcode: r.manufacturerBarcode != null ? r.manufacturerBarcode : '',
                quantityUnitName: r.quantityUnitName,
                incomePrice: r.incomePrice,
                dealerPrice: r.dealerPrice,
                retailPrice: r.retailPrice,
                quantity: 1,
                incomeTotal: r.incomePrice,
                dealerTotal: r.dealerPrice,
                retailTotal: r.retailPrice,
                userCreated: LocalStorage.userId()!,
                userUpdated: LocalStorage.userId()!
            }
            setProducts([...data, n as InventarizationProduct])
            setSelectedS(n as InventarizationProduct)
        }
    }

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
        if (lastBarcode == '') return
        console.log('Barcode: ', lastBarcode)
        CatalogAPI.getProductByBarcode(lastBarcode).then(n => {
            enqueueSnackbar('Товар добавлен', {variant: 'success', autoHideDuration: 3000})
            setInventarizationHandler(n.data)
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

                    <div className={s.leftSide_info}>Дополнительная информация</div>
                    <Button buttonDivWrapper={s.button_chooseItem}
                            onClick={() => {
                                setSelectedM(toInvStorage[0])
                            }}
                    >
                        Выбрать товар
                    </Button>
                    <AsyncSelectSearchProduct onSelect={setInventarizationHandler}/>
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
                    <UniTable rows={toInvStorage.slice(0, 100)}
                              columns={MasterTableColumns}
                              setRows={setProducts}
                              rowOnDoubleClick={(r: any) => {
                                  setInventarizationHandler(r)
                              }}
                              selected={[selectedM]}
                              setSelected={(v) => {
                                  setSelectedM(v[0])
                                  let l = currentInventarization.products.find(n => n.productId === v[0].id)
                                  setSelectedS(l)


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


                                  //setShareSelected(v[0].productId)
                                  //handler()
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