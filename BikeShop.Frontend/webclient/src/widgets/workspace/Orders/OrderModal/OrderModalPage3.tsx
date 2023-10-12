import React, {useState} from 'react';
import s from './OrderModal.module.scss'
import Select from "react-select";
import {AsyncSelectSearchCityNP} from "../../../../shared/ui/AsyncSelectSearch/AsyncSelectSearchCityNP";
import {AsyncSelectSearchWarehouseNP} from "../../../../shared/ui/AsyncSelectSearch/AsyncSelectSearchWarehoseNP";
import useCreateOrderModal from "../CreateOrderModal/CreateOrderModalStore";
import useOrderModal from "./OrderModalStore";
import {
    OrderDeliveryFieldsType,
    OrderDeliveryInfo,
    OrderDeliveryInfoFields
} from "../../../../entities/models/Order/OrderDeliveryInfo";
import {Button, DeleteButton, EditableSpan} from "../../../../shared/ui";
import {useTranslation} from "react-i18next";

class NNPWarehouseResponse {
}

const OrderModalPage3 = () => {

    const deliverySelectOptions = useCreateOrderModal(s => s.deliverySelectOptions)

    const selectedDeliveryOption = useOrderModal(s => s.selectedDeliveryOption)
    const setNPCity = useOrderModal(s => s.setNPCity)
    const NPCity = useOrderModal(s => s.NPCity)
    const setNPWarehouse = useOrderModal(s => s.setNPWarehouse)
    const NPWarehouse = useOrderModal(s => s.NPWarehouse)
    const setSelectedDeliveryOption = useOrderModal(s => s.setSelectedDeliveryOption)
    const orderDeliveryInfo = useOrderModal(s => s.orderDeliveryInfo)
    const setOrderDelivField = useOrderModal(s => s.setOrderDelivField)
    const updateDeliveryData = useOrderModal(s => s.updateDeliveryData)
    const isDirty = useOrderModal(s => s.isDirty)

    const {t} = useTranslation("translation")


    const existKeys = Object.keys(orderDeliveryInfo) as OrderDeliveryFieldsType[]
    const keysArray: { id: number, name: OrderDeliveryFieldsType }[] = OrderDeliveryInfoFields.map((n, ind) => {
        if (!existKeys.includes(n)) return ({id: ind, name: n})
        return ({id: ind, name: " " as OrderDeliveryFieldsType})
    }).filter(n => n.name != " " as OrderDeliveryFieldsType)

    const [sel, setSel] = useState<{ id: number, name: keyof OrderDeliveryInfo } | null>(null)

    return (
        <div className={s.page3}>
            <div className={s.delivery_select_wrapper}>
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
                    }} value={NPCity} setValue={setNPCity} isDisabled={selectedDeliveryOption?.code != "Shipping"}
                    />
                </div>
                <div className={s.delivery_select}>
                    <AsyncSelectSearchWarehouseNP onSelect={() => {
                    }} value={NPWarehouse} setValue={setNPWarehouse}
                                                  cityId={NPCity === null ? '' : NPCity.Ref}
                                                  isDisabled={NPCity === null || selectedDeliveryOption?.code != "Shipping"}/>
                </div>
            </div>
            <Button children={"Оновити поля пошти"} disabled={selectedDeliveryOption?.code != "Shipping"}
                    onClick={updateDeliveryData}/>
            <div className={s.delivery_table}>
                <div className={s.delivery_table_select}>
                    <div className={s.sel}>
                        <Select
                            value={sel}
                            onChange={setSel}
                            options={keysArray}
                            getOptionLabel={label => t(label.name)}
                            getOptionValue={value => value.name}
                            placeholder={"Оберіть додаткове поле"}
                        />
                    </div>
                    <Button className={s.butt} onClick={() => {
                        setOrderDelivField(sel!.name, "Додайте опис")
                        setSel(null)
                    }} disabled={sel === null}>+</Button>
                </div>
                <div className={s.delivery_table_values}>
                    {
                        existKeys.map((n) =>
                            <div className={s.delivery_table_values_value} onClick={() => {
                                //setOrderDelivField(n, undefined)
                            }}>
                                <div className={s.name}>
                                    {t(n)}:
                                </div>
                                <EditableSpan inputDivClassName={s.spn} spanClassName={s.spn2}
                                              title={orderDeliveryInfo[n]!}
                                              onChangeInput={(v) => {
                                                  setOrderDelivField(n, v)
                                              }}/>
                                <DeleteButton size={25} onClick={() => {
                                    setOrderDelivField(n, undefined)
                                }}/>
                            </div>)
                    }
                </div>
            </div>
            <Button disabled={isDirty.length === 0}>Зребегти</Button>
        </div>
    );
};

export default OrderModalPage3;