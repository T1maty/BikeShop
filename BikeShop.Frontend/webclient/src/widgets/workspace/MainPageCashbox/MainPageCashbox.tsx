import React, {useState} from 'react';
import s from "../../../pages/workspace/MainPage/MainPage.module.scss";
import {AsyncSelectSearchProduct, Button, DeleteButton} from "../../../shared/ui";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {BillWithProducts, PaymentData, useCurrency, User} from "../../../entities";
import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore";
import useMainPageStore from "../../../pages/workspace/MainPage/MainPageStore";
import useCashboxStore from "../../../pages/workspace/Cashbox/CashboxStore";
import {BikeShopPaths} from "../../../app/routes/paths";
import {PayModal, PrintModal} from "../../../features";
import {CheckForShop} from "../WorkActs/CheckForShop";
import {Loader} from "../../../shared/ui/Loader/Loader";

export const MainPageCashbox = () => {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()

    const setOpenClientModal = useChooseClientModal(s => s.setOpenClientModal)

    const setIsClientChosen = useMainPageStore(s => s.setIsClientChosen)
    const user = useMainPageStore(s => s.user)
    const setUser = useMainPageStore(s => s.setUser)

    const fbts = useCurrency(s => s.fromBaseToSelected)

    const isLoading = useCashboxStore(s => s.isLoading)
    const sum = useCashboxStore(s => s.sum)
    const bill = useCashboxStore(s => s.bill)
    const setData = useCashboxStore(s => s.setProducts)
    const addProduct = useCashboxStore(s => s.addProduct)
    const paymentHandler = useCashboxStore(s => s.paymentHandler)

    const [openPay, setOpenPay] = useState(false)
    const [res, setRes] = useState<BillWithProducts>()
    const [openPrint, setOpenPrint] = useState(false)
    const [printTrigger, setPrintTrigger] = useState<null | 'agent'>(null)

    const chooseClientHandler = (user: User) => {
        setUser(user)
        setIsClientChosen(true)
        setOpenClientModal(false)
    }

    const paymentResultHandler = (value: PaymentData) => {
        paymentHandler(value, (r) => {
            enqueueSnackbar('Покупка совершена', {variant: 'success', autoHideDuration: 4000})
            setRes(r)
            console.log(r)

            setOpenPrint(true)
            setPrintTrigger("agent")
            setTimeout(() => {
                setPrintTrigger(null)
            }, 3000)

            setData([])
        })
    }

    return (
        <div className={s.rightSide_top}>
            {isLoading ? <Loader variant={"ellipsis"}/> :
                <>
                    <div className={s.select}>
                        <AsyncSelectSearchProduct onSelect={addProduct}/>
                    </div>
                    <div className={s.rightSide_top_search}>

                        {
                            //<ClientSearchModal setIsComponentVisible={setOpenClientSearch} isVisible={openClientSearch} onSuccess={handler}/>
                            //<ChooseClientModal extraCallback={(user: User) => {chooseClientHandler(user)}}/>
                        }
                        <Button buttonDivWrapper={s.search_chooseClientButton}
                                onClick={() => {
                                    setOpenClientModal(true)
                                }}
                        >
                            Выбрать клиента
                        </Button>
                        <div className={s.search_searchInput}>
                            {user && user.lastName} {user && user.firstName} {user && user.patronymic}
                        </div>
                    </div>

                    <div className={s.rightSide_top_info}>
                        {
                            bill.products?.map(n => {
                                return (
                                    <div className={s.cashbox_table_wrapper}>
                                        <div className={s.cashbox_table_left}>
                                            <div className={s.cashbox_table_name}>
                                                {n.name}
                                            </div>
                                            <div className={s.cashbox_table_price}>
                                                {n.price * fbts.c + fbts.s}
                                            </div>
                                            <div className={s.cashbox_table_total}>
                                                {n.total * fbts.c + fbts.s}
                                            </div>
                                        </div>
                                        <DeleteButton size={30}
                                                      onClick={() => {
                                                          setData(bill.products.filter(h => h.productId != n.productId))
                                                      }}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={s.rightSide_top_result}>
                        <Button buttonDivWrapper={s.result_chooseCashboxBtn}
                                onClick={() => {
                                    navigate(BikeShopPaths.WORKSPACE.CASHBOX)
                                }}>
                            Открыть кассу
                        </Button>
                        <Button buttonDivWrapper={s.result_cancelBtn}
                                onClick={() => {
                                }}
                        >
                            X
                        </Button>
                        <div className={s.result_span}>
                            {sum * fbts.c + fbts.s}
                        </div>
                        <PayModal open={openPay}
                                  setOpen={setOpenPay}
                                  user={user}
                                  summ={sum}
                                  result={paymentResultHandler}
                        />
                        <PrintModal printAgentName={'Bill'} open={openPrint} trigger={printTrigger} finaly={() => {
                            setOpenPrint(false)
                        }}
                                    setOpen={setOpenPrint}>
                            <CheckForShop children={res!}/>

                        </PrintModal>
                        <Button buttonDivWrapper={s.result_payBtn}
                                onClick={() => {
                                    setOpenPay(true)
                                }}
                        >
                            К оплате
                        </Button>
                    </div>
                </>
            }
        </div>
    );
};
