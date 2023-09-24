import AsyncSelect from "react-select/async";
import {useState} from "react";
import {ProductCardAPI, ProductFullData} from "../../../entities";
import {GetCatalogDataSearchRequest} from "../../../entities/models/GetCatalogDataSearchRequest";

export const AsyncSelectSearchProductCard = (props: { onSelect: (value: ProductFullData, querry: string) => void, }) => {
    const [arr, setArr] = useState<string>("")

    const loadOptions = (inputValue: string, callback: (value: ProductFullData[]) => void) => {
        let data: GetCatalogDataSearchRequest = {
            querry: inputValue,
            storageId: 0,
            page: 1,
            pageSize: 20,
            filtersVariantIds: [],
            sortingSettings: []
        }
        ProductCardAPI.search(data).then((resp) => {
            callback(resp.data.products)
        }).catch((r) => {
            console.log('searchError', r)
        })
    }

    return (
        <div style={{color: 'black'}}>
            <AsyncSelect
                cacheOptions
                defaultOptions
                isClearable
                inputValue={arr}
                onInputChange={setArr}
                value={null}
                loadOptions={loadOptions}
                onChange={(r) => {
                    props.onSelect(r as ProductFullData, arr)
                    console.log(arr)
                }}
                getOptionLabel={label => label!.product.id + ' | ' + label!.product.name + ' | ' + label!.product.catalogKey}
                getOptionValue={value => value!.product.id.toString()}
                placeholder={'Поиск'}
                noOptionsMessage={() => 'Товар не найден'}
            />
        </div>
    )
};