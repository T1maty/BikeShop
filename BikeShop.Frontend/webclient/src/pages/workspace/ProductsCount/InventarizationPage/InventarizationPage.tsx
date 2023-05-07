import React, {useEffect, useState} from 'react'
import s from "../ProductsCountStyles.module.scss"
import {Button, UniTable} from "../../../../shared/ui"
import {useInventarization} from "./InventarizationPageStore"
import {slaveColumns} from "./models/SlaveTableColumns"
import {InventarizationAPI, InventarizationProduct, LocalStorage} from "../../../../entities"
import {MasterTableColumns} from "./models/MasterTableColumns"
import {useSnackbar} from "notistack";

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

    const setInventarizationHandler = (r: any) => {
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
            setProducts([...data, {
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
            }])
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

    useEffect(() => {
        updateToIv()
    }, [])

    return (
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
                <div className={s.leftSide_delivery}>
                    <div>Доставка</div>
                    <div>Расходы</div>
                </div>
                <div className={s.leftSide_metrika}>
                    <div className={s.metrika_title}>Метрика:</div>
                    <div>Позиций: {}</div>
                    <div>Единиц: {}</div>
                    <div>Приходная сумма: {}</div>
                    <div>Расходы: 99</div>
                    <div>Итого: 99999999</div>
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
                <UniTable rows={toInvStorage}
                          columns={MasterTableColumns}
                          setRows={setProducts}
                          rowOnDoubleClick={(r: any) => {
                              setInventarizationHandler(r)
                          }}
                          selected={[selectedM]}
                          setSelected={(v) => {
                              setSelectedM(v[0])
                              setShareSelected(v[0].productId)
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
                              setShareSelected(v[0].productId)
                              //handler()
                          }}
                          rowOnClick={(d) => {
                              //setShareSelected((d as InventarizationProduct).productId)
                          }}
                />
            </div>
        </div>
    )
}