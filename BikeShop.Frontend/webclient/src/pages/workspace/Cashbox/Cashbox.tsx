import React, {useEffect, useState} from 'react'
import s from './Cashbox.module.scss'
import {AsyncSelectSearchProduct, Button, LoaderScreen, UniTable} from '../../../shared/ui'
import useChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModalStore'
import useCashboxStore from './CashboxStore'
import {ClientCard} from '../../../widgets'
import {CatalogAPI, PaymentData, useAuth, useCurrency, User} from '../../../entities'
import {columns} from "./CashboxTableConfig"
import {useSnackbar} from "notistack"
import {useTranslation} from "react-i18next"
import {
    BarcodeScannerListenerProvider
} from "../../../app/providers/BarcodeScannerListenerProvider/BarcodeScannerListenerProvider"
import ClientSearchModal from "../../../features/ClientSearchModal/ClientSearchModal";
import {DiscountTargetEnum} from "../../../entities/enumerables/DiscountTargetEnum";
import {ChooseDiscountModal, PayModal} from "../../../features";
import {ChooseProductModal} from "../../../widgets/workspace/ProductCatalog/ChooseProductModal/ChooseProductModal";
import {useApp} from "../../../entities/globalStore/AppStore";

export const Cashbox = () => {

    const isActiveTable = true
    const {enqueueSnackbar} = useSnackbar()
    const {t} = useTranslation()

    const [open, setOpen] = useState(false)
    const [openPrint, setOpenPrint] = useState(false)
    const [openPay, setOpenPay] = useState(false)
    const [clientSearch, setClientSearch] = useState(false)

    const setOpenClientModal = useChooseClientModal(s => s.setOpenClientModal)
    const logUser = useAuth(s => s.user)

    const sum = useCashboxStore(s => s.sum)
    const setSum = useCashboxStore(s => s.setSum)
    const isLoading = useCashboxStore(s => s.isLoading)
    const user = useCashboxStore(s => s.user)
    const setUser = useCashboxStore(s => s.setUser)
    const bill = useCashboxStore(s => s.bill)
    const setData = useCashboxStore(s => s.setProducts)
    const addProduct = useCashboxStore(s => s.addProduct)
    const paymentHandler = useCashboxStore(s => s.paymentHandler)

    const bts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)
    const currency = useCurrency(s => s.selectedCurrency)

    const AgentPrintBill = useApp(s => s.AgentPrintBill)

    const [openDiscount, setOpenDiscount] = useState<boolean>(false)

    const paymentResultHandler = (value: PaymentData, ip: boolean) => {

        paymentHandler(value, (r) => {
            enqueueSnackbar('Покупка совершена', {variant: 'success', autoHideDuration: 3000})
            console.log(r)
            if (ip) {
                AgentPrintBill(r.bill.id, 1)
                enqueueSnackbar('Отправленно на печать', {variant: 'success', autoHideDuration: 3000})
            }

            setData([])
        })
    }

    const onBarcodeHandler = (lastBarcode: string) => {
        enqueueSnackbar(`Штрихкод ${lastBarcode}`, {variant: 'default', autoHideDuration: 3000})
        if (lastBarcode == '') return
        console.log('Barcode: ', lastBarcode)
        CatalogAPI.getProductByBarcode(lastBarcode).then(n => {
            enqueueSnackbar('Товар добавлен', {variant: 'success', autoHideDuration: 3000})
            addProduct(n.data)
        }).catch(() => {
            enqueueSnackbar('Товар не найден', {variant: 'warning', autoHideDuration: 5000})
        })
    }

    useEffect(() => {
        let sum = 0
        bill.products?.forEach(n => {
            sum += (n.quantity * n.price - n.discount)
        })
        setSum(sum)
    }, [bill])

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {
        return (
            <BarcodeScannerListenerProvider onBarcodeRead={onBarcodeHandler}>
                <div className={s.cashboxMainBlock}>
                    <ClientSearchModal setIsComponentVisible={setClientSearch} isComponentVisible={clientSearch}
                                       onSuccess={(u) => {
                                           setUser(u)
                                       }}/>
                    <div className={s.cashboxMainBlock_leftSideWrapper}>
                        <div className={s.leftSide_tables}>
                            <Button onClick={() => {
                            }}
                                    disabled={!isActiveTable}
                            >
                                Касса 1
                            </Button>
                            <Button onClick={() => {
                            }}
                                    disabled={isActiveTable}
                            >
                                Касса 2
                            </Button>
                            <Button onClick={() => {
                            }}
                                    disabled={isActiveTable}
                            >
                                Касса 3
                            </Button>
                            <Button onClick={() => {
                            }}
                                    disabled={isActiveTable}
                            >
                                Касса 4
                            </Button>
                        </div>

                        <div className={s.leftSide_client}>

                            <ClientCard user={user}/>
                            <div className={s.leftSide_client_buttons}>
                                <Button buttonDivWrapper={s.client_buttons_choose}
                                        onClick={() => setClientSearch(true)}
                                >
                                    Выбрать клиента
                                </Button>
                                <Button buttonDivWrapper={s.client_buttons_cancel}
                                        onClick={() => {
                                            setUser({} as User)
                                        }}
                                >
                                    X
                                </Button>
                            </div>
                        </div>

                        <div className={s.leftSide_discount}>
                            <div className={s.discount_background}>
                                <div className={s.discount_info}>
                                    <div className={s.info_title}>
                                        Скидка
                                    </div>
                                    <div className={s.info_name}>
                                        Название скидки
                                    </div>
                                    <div className={s.info_types}>
                                        <div className={s.info_type}>Тип</div>
                                        <div className={s.info_value}>Размер</div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.discount_buttons}>
                                <ChooseDiscountModal open={openDiscount} setOpen={setOpenDiscount}
                                                     target={DiscountTargetEnum.ShopBillTotal} onChange={() => {
                                }}/>

                                <Button buttonDivWrapper={s.buttons_choose}
                                        onClick={() => {
                                            setOpenDiscount(true)
                                        }}
                                >
                                    Выбрать скидку для клиента
                                </Button>
                                <Button buttonDivWrapper={s.buttons_cancel}
                                        onClick={() => {
                                        }}
                                >
                                    X
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={s.cashboxMainBlock_rightSideWrapper}>
                        <div className={s.cashboxMainBlock_rightSideHeader}>
                            <ChooseProductModal open={open}
                                                setOpen={setOpen}
                                                addData={addProduct}
                                                data={bill.products}
                                                slaveColumns={columns}
                            />

                            <Button buttonDivWrapper={s.header_chooseBtn}
                                    onClick={() => {
                                        setOpen(true)
                                    }}
                            >
                                Выбрать товары
                            </Button>
                            <div className={s.header_searchSelect}>
                                <AsyncSelectSearchProduct onSelect={addProduct}/>
                            </div>
                        </div>

                        <div className={s.cashboxMainBlock_rightSideMiddle}>
                            <UniTable rows={bill.products} columns={columns} setRows={setData}/>
                        </div>

                        <div className={s.cashboxMainBlock_rightSideBottom}>
                            <div className={s.rightSideBottom_buttonsBlock}>
                                <div className={s.buttonsBlock_one}>
                                    <div className={s.one_cancelBtn}>
                                        <Button onClick={() => {
                                            setData([])
                                        }}>
                                            X
                                        </Button>
                                    </div>
                                    <div className={s.one_noDiscount}>
                                        Без скидки
                                    </div>
                                    <div className={s.one_discount}>
                                        Скидка
                                    </div>
                                </div>
                                <div className={s.buttonsBlock_two}>
                                    {sum * bts.c + bts.s}
                                </div>

                                <div className={s.rightSideBottom_payBlock}>
                                    <PayModal open={openPay}
                                              setOpen={setOpenPay}
                                              user={user}
                                              summ={sum}
                                              result={paymentResultHandler}
                                    />
                                    <Button onClick={() => {
                                        setOpenPay(true)
                                    }}>
                                        К оплате
                                    </Button>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </BarcodeScannerListenerProvider>
        )
    }


}