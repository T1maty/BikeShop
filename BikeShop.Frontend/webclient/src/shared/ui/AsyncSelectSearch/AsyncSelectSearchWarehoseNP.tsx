import React from "react";
import AsyncSelect from "react-select/async";
import {NovaPoshtaAPI} from "../../../entities/api/NovaPoshtaAPI";
import {NPRequestWrapper} from "../../../entities/models/NovaPoshta/Request/NPRequestWrapper";
import {NPWarehouseResponse} from "../../../entities/models/NovaPoshta/Response/NPWarehouseResponse";
import {NPWarehouseSearchRequest} from "../../../entities/models/NovaPoshta/Request/NPWarehouseSearchRequest";

export const AsyncSelectSearchWarehouseNP = (props: { onSelect: (value: NPWarehouseResponse) => void, value: NPWarehouseResponse | null, setValue: (v: NPWarehouseResponse | null) => void, cityId: string, isDisabled?: boolean }) => {

    const loadOptions = (inputValue: string, callback: (value: NPWarehouseResponse[]) => void) => {
        let request: NPRequestWrapper<NPWarehouseSearchRequest> = {
            apiKey: "b999eaca6863967c372f125b71fe1f67",
            modelName: "Address",
            calledMethod: "getWarehouses",
            methodProperties: {
                FindByString: inputValue,
                Limit: "50",
                Language: "UA",
                CityRef: props.cityId
            }
        }

        NovaPoshtaAPI.WarehouseSearch(request).then((resp) => {
            console.log(resp.data.data)
            callback(resp.data.data)
        }).catch((r) => {
            console.log('searchError', r)
        })
    }

    return (
        <div style={{color: 'black'}}>
            <AsyncSelect
                isDisabled={props.isDisabled}
                cacheOptions
                defaultOptions
                isClearable
                value={props.value}
                loadOptions={loadOptions}
                onChange={(r) => {
                    props.setValue(r as NPWarehouseResponse)
                    props.onSelect(r as NPWarehouseResponse)
                    console.log('selected', r)
                }}
                getOptionLabel={label => label!.Description}
                getOptionValue={value => value!.Description}
                placeholder={'Пошук відділення'}
                noOptionsMessage={() => 'Відділення не знайдено'}
            />
        </div>
    )
}