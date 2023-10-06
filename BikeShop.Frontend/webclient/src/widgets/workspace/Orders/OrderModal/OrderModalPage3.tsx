import React, {useState} from 'react';
import s from './OrderModal.module.scss'
import Select from "react-select";
import {AsyncSelectSearchCityNP} from "../../../../shared/ui/AsyncSelectSearch/AsyncSelectSearchCityNP";
import {AsyncSelectSearchWarehouseNP} from "../../../../shared/ui/AsyncSelectSearch/AsyncSelectSearchWarehoseNP";
import {NPCityResponse} from "../../../../entities/models/NovaPoshta/Response/NPCityResponse";
import {NPWarehouseResponse} from "../../../../entities/models/NovaPoshta/Response/NPWarehouseResponse";

class NNPWarehouseResponse {
}

const OrderModalPage3 = () => {
    const [NPCity, setNPCity] = useState<NPCityResponse | null>(null)
    const [NPWarehouse, setNPWarehouse] = useState<NPWarehouseResponse | null>(null)
    return (
        <div className={s.page3}>
            <div>
                <Select
                    isClearable
                    //value={selectedDeliveryOption}
                    //onChange={setSelectedDeliveryOption}
                    //options={deliverySelectOptions}
                    //getOptionLabel={label => label.name}
                    //getOptionValue={value => value.name}
                    placeholder={"Оберіть тип доставки"}
                />
                <div className={s.delivery_select}>
                    <AsyncSelectSearchCityNP onSelect={() => {
                    }} value={NPCity} setValue={setNPCity}
                    />
                </div>
                <div className={s.delivery_select}>
                    <AsyncSelectSearchWarehouseNP onSelect={() => {
                    }} value={NPWarehouse} setValue={setNPWarehouse}
                                                  cityId={NPCity === null ? '' : NPCity.Ref}
                                                  isDisabled={NPCity === null}/>
                </div>
            </div>

            <div className={s.delivery_table}>
                <div className={s.delivery_table_select}>
                    <div className={s.sel}><Select/></div>
                    <div className={s.butt}>+</div>
                </div>
            </div>
        </div>
    );
};

export default OrderModalPage3;