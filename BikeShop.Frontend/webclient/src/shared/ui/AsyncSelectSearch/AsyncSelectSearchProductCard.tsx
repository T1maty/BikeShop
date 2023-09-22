import AsyncSelect from "react-select/async";
import {useState} from "react";
import {ProductCardAPI, ProductFullData} from "../../../entities";
import {ProductCatalogResponse} from "../../../entities/models/ProductCatalogResponse";

export const AsyncSelectSearchProductCard = (props: { onSelect: (value: ProductFullData, searchResult: ProductCatalogResponse) => void }) => {
    const [arr, setArr] = useState<ProductCatalogResponse | null>(null)

    const loadOptions = (inputValue: string, callback: (value: ProductFullData[]) => void) => {
        ProductCardAPI.searchProductByName(inputValue).then((resp) => {
            const asyncOptions = resp.data.map((n: Product) => {
                return ({label: n.name, value: n.id})
            })
            console.log(asyncOptions)
            setArr(resp.data)
            callback(resp.data)
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
                value={null}
                loadOptions={loadOptions}
                onChange={(r) => {
                    props.onSelect(r as Product, arr)
                    console.log('selected', r)
                }}
                getOptionLabel={label => label!.id + ' | ' + label!.name + ' | ' + label!.catalogKey}
                getOptionValue={value => value!.name}
                placeholder={'Поиск'}
                noOptionsMessage={() => 'Товар не найден'}
            />
        </div>
    )
};