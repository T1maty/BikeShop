import React, {useEffect, useState} from 'react';
import s from "../ProductsCountStyles.module.scss";
import {AsyncSelectSearchProduct, Button, CustomInput, UniTable} from "../../../../shared/ui";
import Enumerable from "linq";
import {ChooseProductModal} from "../../../../features";
import {columns} from "./Columns";
import useOutcomeActPage from "./OutcomeActPageStore";
import {useCurrency} from "../../../../entities";
import {useSnackbar} from "notistack";

const OutcomeActPage = () => {
    const {enqueueSnackbar} = useSnackbar()

    const isCreating = useOutcomeActPage(s => s.isCreating)
    const currentAct = useOutcomeActPage(s => s.currentAct)
    const setDescription = useOutcomeActPage(s => s.setDescription)
    const addProduct = useOutcomeActPage(s => s.addProduct)
    const setProducts = useOutcomeActPage(s => s.setProducts)
    const clear = useOutcomeActPage(s => s.clear)
    const saveHandler = useOutcomeActPage(s => s.saveHandler)
    const errorStatus = useOutcomeActPage(s => s.errorStatus)

    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)

    const [vis, setVis] = useState(false)
    const [sum, setSum] = useState(0)

    useEffect(() => {
        if (errorStatus != "default") {
            enqueueSnackbar('Ошибка!', {
                variant: 'error',
                autoHideDuration: 3000
            })

        }
    }, [errorStatus])

    useEffect(() => {
        if (currentAct?.products != null) {
            setSum(Enumerable.from(currentAct.products).select(n => n.quantity * n.incomePrice).sum())
        }
    }, [currentAct])

    return (
        <div className={s.arrivalOfProducts_mainBlock}>
            <div className={s.arrivalOfProducts_leftSide}>
                <div className={s.leftSide_title}>
                    {isCreating ? 'Новое списание' : "Списание номер " + currentAct?.outcomeAct.id}
                </div>
                <div className={s.leftSide_info}>
                    <CustomInput
                        placeholder={"Обязательное описание"}
                        value={currentAct?.outcomeAct.description}
                        onChange={(value) => {
                            setDescription(value.target.value)
                        }}
                    />
                </div>
                <Button buttonDivWrapper={s.button_chooseItem}
                        onClick={() => {
                            setVis(true)
                        }}
                >
                    Выбрать товар
                </Button>
                <AsyncSelectSearchProduct onSelect={addProduct}/>


                <div className={s.leftSide_metrika}>
                    <div className={s.metrika_title}>Метрика:</div>
                    <div>Позиций: {currentAct?.products?.length}</div>
                    <div>Единиц: {Enumerable.from(currentAct?.products ? currentAct?.products : []).select(n => parseFloat(n.quantity.toString())).sum()}</div>
                    <div>Приходная сумма:
                        {r(sum * fbts.c) + fbts.s}
                    </div>
                </div>
                <div className={s.leftSide_footerButtons}>
                    <Button buttonDivWrapper={s.button_save}
                            onClick={() => {
                                saveHandler(() => {
                                    if (isCreating) {
                                        enqueueSnackbar('Накладная создана!', {
                                            variant: 'success',
                                            autoHideDuration: 3000
                                        })
                                    } else {
                                        enqueueSnackbar('Накладная обновлена!', {
                                            variant: 'success',
                                            autoHideDuration: 3000
                                        })
                                    }
                                })
                            }}
                    >
                        Сохранить акт
                    </Button>
                    <Button buttonDivWrapper={s.button_cancel}
                            onClick={() => {
                                clear()
                            }}
                    >
                        Отмена
                    </Button>
                </div>
            </div>

            <div className={s.arrivalOfProducts_rightSide}>
                <ChooseProductModal setOpen={setVis}
                                    slaveColumns={columns}
                                    setDataSlaveTable={setProducts}
                                    data={currentAct?.products} open={vis}
                                    addData={(value: any) => {
                                        addProduct(value)
                                    }}
                />
                <UniTable rows={currentAct?.products}
                          columns={columns}
                          setRows={setProducts}
                />
            </div>
        </div>
    )
};

export default OutcomeActPage;