import React, {useEffect} from 'react'
import s from "../ProductsCount/ProductsWrapper.module.scss"
import {Button, UniTable} from "../../../shared/ui"
import {useInventarization} from "./InventarizationPageStore"
import {slaveColumns} from "./models/SlaveTableColumns"
import {InventarizationAPI, InventarizationProduct, LocalStorage} from "../../../entities"
import {MasterTableColumns} from "./models/MasterTableColumns";

export const InventarizationPage = () => {

    const currentInventarization = useInventarization(s => s.currentInventarization)
    const setProducts = useInventarization(s => s.setProducts)
    const toInvStorage = useInventarization(s => s.toInvStorage)
    const updateToIv = useInventarization(s => s.updateToIv)

    const setInventarizationHandler = (row: any) => {

        let prod: InventarizationProduct = {
            id: 0,
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
            enabled: true,
            inventariazationId: currentInventarization.inventarization.id,
            productId: row.id,
            name: row.name,
            description: '',
            catalogKey: row.catalogKey,
            barcode: row.barcode,
            manufBarcode: row.manufacturerBarcode,
            quantityUnitName: row.quantityUnitName,
            incomePrice: row.incomePrice,
            dealerPrice: row.dealerPrice,
            retailPrice: row.retailPrice,
            quantity: 1,
            incomeTotal: row.incomePrice,
            dealerTotal: row.dealerPrice,
            retailTotal: row.retailPrice,
            userCreated: LocalStorage.userId()!,
            userUpdated: LocalStorage.userId()!
        }

        setProducts([...currentInventarization.products, prod])
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
        InventarizationAPI.update(data)
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
                    // onClick={() => {setVis(true)}}
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

            <div className={s.arrivalOfProducts_rightSide}>
                <UniTable rows={toInvStorage}
                          columns={MasterTableColumns}
                          setRows={setProducts}
                />
                <br/>
                <UniTable rows={currentInventarization.products}
                          columns={slaveColumns}
                          setRows={setProducts}
                />
            </div>

        </div>
    )
}