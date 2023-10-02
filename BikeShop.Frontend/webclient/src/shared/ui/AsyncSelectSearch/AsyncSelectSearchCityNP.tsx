import React from "react";
import AsyncSelect from "react-select/async";
import {NovaPoshtaAPI} from "../../../entities/api/NovaPoshtaAPI";
import {NPRequestWrapper} from "../../../entities/models/NovaPoshta/Request/NPRequestWrapper";
import {NPCitySearchRequest} from "../../../entities/models/NovaPoshta/Request/NPCitySearchRequest";
import {NPCityResponse} from "../../../entities/models/NovaPoshta/Response/NPCityResponse";

export const AsyncSelectSearchCityNP = (props: { onSelect: (value: NPCityResponse) => void, value: NPCityResponse | null, setValue: (v: NPCityResponse | null) => void, isDisabled?: boolean }) => {

    const loadOptions = (inputValue: string, callback: (value: NPCityResponse[]) => void) => {
        let request: NPRequestWrapper<NPCitySearchRequest> = {
            apiKey: "b999eaca6863967c372f125b71fe1f67",
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: {
                FindByString: inputValue,
                Limit: "50",
                Language: "UA"
            }
        }

        NovaPoshtaAPI.CitySearch(request).then((resp) => {
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
                    props.setValue(r as NPCityResponse)
                    props.onSelect(r as NPCityResponse)
                    console.log('selected', r)
                }}
                getOptionLabel={label => label!.Description}
                getOptionValue={value => value!.Description}
                placeholder={'Пошук міста'}
                noOptionsMessage={() => 'Місто не знайдено'}
            />
        </div>
    )
}