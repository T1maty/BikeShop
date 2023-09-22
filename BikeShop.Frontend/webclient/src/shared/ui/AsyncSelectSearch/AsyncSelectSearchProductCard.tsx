import AsyncSelect from "react-select/async";
import {useState} from "react";
import {ProductCardAPI, ProductFullData} from "../../../entities";
import {ProductCatalogResponse} from "../../../entities/models/ProductCatalogResponse";
import {GetCatalogDataSearchRequest} from "../../../entities/models/GetCatalogDataSearchRequest";

export const AsyncSelectSearchProductCard = (props: { onSelect: (value: ProductFullData, searchResult: ProductCatalogResponse) => void, selectedStorageId: number }) => {
    const [arr, setArr] = useState<ProductCatalogResponse | null>(null)

    const loadOptions = (inputValue: string, callback: (value: ProductFullData[]) => void) => {
        let data: GetCatalogDataSearchRequest = {
            querry: inputValue,
            storageId: props.selectedStorageId,
            page: 1,
            pageSize: 20,
            filtersVariantIds: [],
            sortingSettings: []
        }
        ProductCardAPI.search(data).then((resp) => {
            setArr(resp.data)
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
                value={null}
                loadOptions={loadOptions}
                onChange={(r) => {
                    props.onSelect(r as ProductFullData, arr!)
                    console.log('selected', r)
                }}
                getOptionLabel={label => label!.product.id + ' | ' + label!.product.name + ' | ' + label!.product.catalogKey}
                getOptionValue={value => value!.product.id.toString()}
                placeholder={'Поиск'}
                noOptionsMessage={() => 'Товар не найден'}
            />
        </div>
    )
};