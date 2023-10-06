import React, {useEffect, useState} from 'react';
import {CustomCheckbox, CustomModal, CustomTextarea} from "../../../../shared/ui";
import useCreateOrderModal from "./CreateOrderModalStore";
import s from './CreateOrderModal.module.scss'
import ClientSearchModal from "../../../../features/ClientSearchModal/ClientSearchModal";
import {useCurrency} from "../../../../entities";
import Select from "react-select";
import {useSnackbar} from "notistack";
import {Loader} from "../../../../shared/ui/Loader/Loader";
import useOrderManager from "../../../../features/OrderManager/OrderManagerStore";
import {AsyncSelectSearchCityNP} from "../../../../shared/ui/AsyncSelectSearch/AsyncSelectSearchCityNP";
import {AsyncSelectSearchWarehouseNP} from "../../../../shared/ui/AsyncSelectSearch/AsyncSelectSearchWarehoseNP";
import OrderProductTable from "./OrderProductTable";

const CreateOrderModal = () => {
    const open = useCreateOrderModal(s => s.open)
    const setOpen = useCreateOrderModal(s => s.setOpen)
    const client = useCreateOrderModal(s => s.client)
    const setClient = useCreateOrderModal(s => s.setClient)
    const products = useCreateOrderModal(s => s.products)
    const isFirstPage = useCreateOrderModal(s => s.isFirstPage)
    const setIsFirstPage = useCreateOrderModal(s => s.setIsFirstPage)
    const clear = useCreateOrderModal(s => s.clear)
    const deliverySelectOptions = useCreateOrderModal(s => s.deliverySelectOptions)
    const selectedDeliveryOption = useCreateOrderModal(s => s.selectedDeliveryOption)
    const setSelectedDeliveryOption = useCreateOrderModal(s => s.setSelectedDeliveryOption)
    const selectedManager = useCreateOrderModal(s => s.selectedManager)
    const setSelectedManager = useCreateOrderModal(s => s.setSelectedManager)
    const employees = useCreateOrderModal(s => s.employees)
    const getEmployees = useCreateOrderModal(s => s.getEmployees)
    const isPrePay = useCreateOrderModal(s => s.isPrePay)
    const setIsPrePay = useCreateOrderModal(s => s.setIsPrePay)
    const deliveryDescription = useCreateOrderModal(s => s.deliveryDescription)
    const setDeliveryDescription = useCreateOrderModal(s => s.setDeliveryDescription)
    const clientInfo = useCreateOrderModal(s => s.clientInfo)
    const setClientInfo = useCreateOrderModal(s => s.setClientInfo)
    const warning = useCreateOrderModal(s => s.warning)
    const setWarning = useCreateOrderModal(s => s.setWarning)
    const confirm = useCreateOrderModal(s => s.confirm)
    const isLoading = useCreateOrderModal(s => s.isLoading)
    const NPCity = useCreateOrderModal(s => s.NPCity)
    const NPWarehouse = useCreateOrderModal(s => s.NPWarehouse)
    const setNPCity = useCreateOrderModal(s => s.setNPCity)
    const setNPWarehouse = useCreateOrderModal(s => s.setNPWarehouse)

    const addOrder = useOrderManager(s => s.addOrder)
    const fbts = useCurrency(s => s.fromBaseToSelected)
    const r = useCurrency(s => s.roundUp)
    const {enqueueSnackbar} = useSnackbar()

    const [stats, setStats] = useState<{ poz: number, od: number, withoutDisc: number, disc: number }>({
        poz: 0,
        od: 0,
        withoutDisc: 0,
        disc: 0
    })
    const [openChooseClient, setOpenChooseClient] = useState(false)

    useEffect(() => {
        let data: { poz: number, od: number, withoutDisc: number, disc: number } = {
            poz: 0,
            od: 0,
            withoutDisc: 0,
            disc: 0
        }

        products.forEach((p) => {
            data.poz += 1
            data.od += p.q
            data.withoutDisc += p.p.retailPrice * p.q
        })

        setStats(data)
    }, [products])
    useEffect(() => {
        if (open) {
            getEmployees()
            if (client === null) setOpenChooseClient(true)
        }
    }, [open])
    useEffect(() => {
        let text = "";
        if (warning === "noDeliveryType") text = 'Оберіть тип доставки'
        if (warning === "noManager") text = 'Оберіть менеджера'
        if (warning === "noProducts") text = 'Оберіть товари для замовлення'
        if (warning === "noClient") text = 'Оберіть клієнта'
        if (warning === "noDeliveryData") text = 'Заповніть інформацію по доставці'
        if (text === "") return
        enqueueSnackbar(text, {variant: 'warning', autoHideDuration: 3000})
        setWarning("")
    }, [warning])

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div className={s.wrapper}>
                {
                    isLoading ? <Loader variant={"ellipsis"}/> :
                        isFirstPage ?
                            <>

                                <ClientSearchModal setIsComponentVisible={setOpenChooseClient}
                                                   isComponentVisible={openChooseClient}
                                                   onSuccess={setClient}/>
                                <div className={s.client}>
                                    <div className={s.client_title}>Клієнт:</div>
                                    <div className={s.client_fio}
                                         onClick={() => setOpenChooseClient(true)}>{client === null ? "Клієнта не обрано" : client.firstName + ' ' + client.lastName + ' ' + client.patronymic + '  ' + client.phoneNumber}</div>
                                    <div className={s.client_data}>
                                        {client != null ? <>
                                            <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                                                <div style={{fontWeight: "300", fontSize: "12px"}}>Баланс:</div>
                                                <div
                                                    style={{fontWeight: "600"}}>{r(client.balance * fbts.c) + fbts.s}</div>
                                            </div>
                                            <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                                                <div style={{fontWeight: "300", fontSize: "12px"}}>Кред. Лім.:</div>
                                                <div
                                                    style={{fontWeight: "600"}}>{r(client.creditLimit * fbts.c) + fbts.s}</div>
                                            </div>
                                        </> : <></>}
                                    </div>
                                </div>

                                <OrderProductTable/>
                                <div className={s.stats}>
                                    <div className={s.stats_item}>
                                        <div className={s.stats_item_label}>Товарів:</div>
                                        <div
                                            className={s.stats_item_value}>{stats.poz + 'поз., ' + stats.od + 'од.'}</div>
                                    </div>

                                    <div className={s.stats_item}>
                                        <div className={s.stats_item_label}>Без знижки:</div>
                                        <div
                                            className={s.stats_item_value}>{r(stats.withoutDisc * fbts.c) + fbts.s}</div>
                                    </div>

                                    <div className={s.stats_item}>
                                        <div className={s.stats_item_label}>Знижка:</div>
                                        <div className={s.stats_item_value}>{r(stats.disc * fbts.c) + fbts.s}</div>
                                    </div>
                                </div>

                                <div
                                    className={s.total}>{'До сплати: ' + r(stats.withoutDisc * fbts.c - stats.disc * fbts.c) + fbts.s}</div>

                                <div className={s.buttons}>
                                    <div className={s.button_cancel} onClick={clear}>Скинути</div>
                                    <div className={s.button_next} onClick={() => {
                                        setIsFirstPage(false)
                                    }}>Наступна сторінка
                                    </div>
                                </div>
                            </> : <>
                                <div className={s.client_info}>
                                    <div style={{padding: "0 0 3px 5px", fontSize: "14px"}}>Інформація від
                                        клієнта:
                                    </div>
                                    <CustomTextarea style={{color: 'black'}} divClassName={s.taw} value={clientInfo}
                                                    onChange={(v) => {
                                                        setClientInfo(v.target.value)
                                                    }}/>
                                </div>
                                <div className={s.delivery_select}>
                                    <Select
                                        isClearable
                                        value={selectedDeliveryOption}
                                        onChange={setSelectedDeliveryOption}
                                        options={deliverySelectOptions}
                                        getOptionLabel={label => label.name}
                                        getOptionValue={value => value.name}
                                        placeholder={"Оберіть тип доставки"}
                                    />
                                </div>
                                <div className={s.delivery_select}>
                                    <AsyncSelectSearchCityNP onSelect={() => {
                                    }} value={NPCity} setValue={setNPCity}
                                                             isDisabled={selectedDeliveryOption?.code != "Shipping"}/>
                                </div>
                                <div className={s.delivery_select}>
                                    <AsyncSelectSearchWarehouseNP onSelect={() => {
                                    }} value={NPWarehouse} setValue={setNPWarehouse}
                                                                  cityId={NPCity === null ? '' : NPCity.Ref}
                                                                  isDisabled={NPCity === null}/>
                                </div>
                                <div className={s.delivery_data}>
                                    <div style={{padding: "0 0 3px 5px", fontSize: "14px"}}>Інформація по доставці:</div>
                                    <CustomTextarea style={{color: 'black'}} value={deliveryDescription} onChange={v => {
                                        setDeliveryDescription(v.target.value)
                                    }}/>
                                </div>
                                <div className={s.checkbox}><CustomCheckbox checked={!isPrePay} onChangeChecked={(v) => {
                                    setIsPrePay(!v)
                                }} children={"Оплата при отриманні (не бажано)"}/>
                                </div>
                                <div className={s.manager}>
                                    <div style={{padding: "0 0 3px 5px", fontSize: "14px"}}>Менеджер замовлення:</div>
                                    <Select
                                        isClearable
                                        value={selectedManager}
                                        onChange={setSelectedManager}
                                        options={employees}
                                        getOptionLabel={label => label.lastName + " " + label.firstName}
                                        getOptionValue={value => value.lastName + " " + value.firstName}
                                        placeholder={"Менеджер замовлення"}
                                    />
                                </div>

                                <div className={s.buttons}>
                                    <div className={s.button_back} onClick={() => {
                                        setIsFirstPage(true)
                                    }}>Назад
                                    </div>
                                    <div className={s.button_conf} onClick={() => {
                                        confirm(addOrder)
                                    }}>Створити
                                    </div>
                                </div>

                            </>
                }

            </div>
        </CustomModal>
    );
};

export default CreateOrderModal;