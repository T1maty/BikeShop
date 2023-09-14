import {AxiosResponse} from "axios"
import {CreateShopResponse} from "../DataTransferObjects/responses/ShopResponse"
import {CreateShop, UpdateShop} from "../DataTransferObjects/requests/CreateShop"
import {GetQuantityUnitResponse} from "../DataTransferObjects/responses/QuantityUnitResponse"
import {CreateQuantityUnit, UpdateQuantityUnit} from "../DataTransferObjects/requests/CreateQuantityUnit"
import {CreateStorageResponse} from "../DataTransferObjects/responses/StorageResponse"
import {CreateStorage, UpdateStorage} from "../DataTransferObjects/requests/CreateStorage"

import {
    ProductOptionsWithVariants
} from "../../features/ProductCatalogFeatures/EditProductCardModal/models/ProductOptionsWithVariants"
import {Currency} from "../models/Others/Currency";
import {CreateOption} from "../DataTransferObjects/requests/CreateOption";
import {UpdateOption} from "../DataTransferObjects/requests/UpdateOption";
import {$api} from "../../shared";
import {ProductFilter} from "../DataTransferObjects/ProductFilter";
import {CreateFilter} from "../DataTransferObjects/requests/CreateFilter";
import {ProductFiltersDTO} from "../DataTransferObjects/responses/ProductFiltersDTO";

export const EntitiesAPI = {
    Shop: {
        getShops(): Promise<AxiosResponse<CreateShopResponse[]>> {
            return (
                $api.get<CreateShopResponse[]>('/shop/getall')
            )
        },
        addNewShop(data: CreateShop): any {
            return (
                $api.post<CreateShop>('/shop/create', data)
            )
        },
        updateShopInfo(updateData: CreateShop): any {
            return (
                $api.put<UpdateShop>('/shop/update', updateData)
            )
        },
    },

    Storage: {
        getStorages(): Promise<AxiosResponse<CreateStorageResponse[]>> {
            return (
                $api.get<CreateStorageResponse[]>('/storagecrud/getall')
            )
        },
        addNewStorage(data: CreateStorage): Promise<AxiosResponse<CreateStorage>> {
            return (
                $api.post<CreateStorage>('/storagecrud/create', data)
            )
        },
        updateStorageInfo(updateData: UpdateStorage): any {
            return (
                $api.post<UpdateStorage>('/storagecrud/update', updateData)
            )
        },
    },

    QuantityUnit: {
        getQuantityUnits(): Promise<AxiosResponse<GetQuantityUnitResponse[]>> {
            return (
                $api.get<GetQuantityUnitResponse[]>('/quantityunit/getall')
            )
        },
        addQuantityUnit(data: CreateQuantityUnit): any {
            return (
                $api.post<CreateQuantityUnit>('/quantityunit/create', data)
            )
        },
        updateQuantityUnit(updateData: UpdateQuantityUnit): any {
            return (
                $api.put<UpdateQuantityUnit>('/quantityunit/update', updateData)
            )
        },
    },

    Currency: {
        getCurrencies(): Promise<AxiosResponse<Currency[]>> {
            return (
                $api.get<Currency[]>('/currency/getall')
            )
        },
        createCurrency(data: Currency): any {
            return (
                $api.post<Currency>('/currency/create', data)
            )
        },
        updateCurrency(updateData: Currency): any {
            return (
                $api.put<Currency>('/currency/update', updateData)
            )
        },
        getCurrencyHistory(currencyID: number): any {
            return (
                $api.get<Currency>(`/currency/gethistory?currencyID=${currencyID}`)
            )
        },
    },

    Option: {
        getOptions(): Promise<AxiosResponse<ProductOptionsWithVariants[]>> {
            return (
                $api.get<ProductOptionsWithVariants[]>('/productcard/getalloptions')
            )
        },
        addNewOption(data: CreateOption): Promise<AxiosResponse<ProductOptionsWithVariants>> {
            return (
                $api.post<ProductOptionsWithVariants>('/productcard/createoption', data)
            )
        },
        updateOption(updateData: UpdateOption): Promise<AxiosResponse<ProductOptionsWithVariants>> {
            return (
                $api.put<ProductOptionsWithVariants>('/productcard/updateoption', updateData)
            )
        },
        addOptionVariant(optionId: number, name: string): Promise<AxiosResponse<ProductOptionsWithVariants>> {
            return (
                $api.put<ProductOptionsWithVariants>(`/productcard/addoptionvariant?optionId=${optionId}&name=${name}`)
            )
        },
    },

    Filters: {
        getFilters(): Promise<AxiosResponse<ProductFilter[]>> {
            return (
                $api.get<ProductFilter[]>('/productcard/getallfilters')
            )
        },
        createFilter(data: CreateFilter): Promise<AxiosResponse<ProductFilter>> {
            return (
                $api.post<ProductFilter>('/productcard/createfilter', data)
            )
        },
        updateFilter(updateData: CreateFilter): Promise<AxiosResponse<ProductFilter>> {
            return (
                $api.put<ProductFilter>('/productcard/updatefilter', updateData)
            )
        },
        getFiltersByProducts(productIds: number[]): Promise<AxiosResponse<ProductFiltersDTO[]>> {
            return (
                $api.post<ProductFiltersDTO[]>('productcard/getfiltersofproducts', productIds)
            )
        },
    }
}