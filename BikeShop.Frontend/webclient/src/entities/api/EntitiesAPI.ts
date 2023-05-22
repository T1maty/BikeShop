import {AxiosResponse} from "axios"
import {CreateShopResponse} from "../responses/ShopResponse"
import {CreateShop, UpdateShop} from "../requests/CreateShop"
import {GetQuantityUnitResponse} from "../responses/QuantityUnitResponse"
import {CreateQuantityUnit, UpdateQuantityUnit} from "../requests/CreateQuantityUnit"
import {CreateStorageResponse} from "../responses/StorageResponse"
import {CreateStorage, UpdateStorage} from "../requests/CreateStorage"
import {UpdateSpecification} from '../requests/UpdateSpecification'
import {ProductSpecification} from "../entities/ProductSpecification"

import {
    ProductOptionsWithVariants
} from "../../features/ProductCatalogFeatures/EditProductCardModal/models/ProductOptionsWithVariants"
import {Currency} from "../models/Others/Currency";
import {CreateOption} from "../requests/CreateOption";
import {UpdateOption} from "../requests/UpdateOption";
import {$api} from "../../shared";

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

    Specification: {
        getSpecifications(): Promise<AxiosResponse<ProductSpecification[]>> {
            return (
                $api.get<ProductSpecification[]>('/productcard/getallspecifications')
            )
        },
        addNewSpecification(name: string): Promise<AxiosResponse<ProductSpecification, any>> {
            return (
                $api.post<{ name: string }, any>(`/productcard/createspecification?name=${name}`)
            )
        },
        updateSpecification(updateData: UpdateSpecification): any {
            return (
                $api.put<UpdateSpecification>('/productcard/updatespecification', updateData)
            )
        },
    },

    Option: {
        getOptions(): Promise<AxiosResponse<ProductOptionsWithVariants[]>> {
            return (
                $api.get<ProductOptionsWithVariants[]>('/productcard/getalloptions')
            )
        },
        addNewOption(data: CreateOption): Promise<AxiosResponse<ProductOptionsWithVariants[], any>> {
            return (
                $api.post<CreateOption, any>('/productcard/createoption', data)
            )
        },
        updateOption(updateData: UpdateOption): Promise<AxiosResponse<ProductOptionsWithVariants[], any>> {
            return (
                $api.put<UpdateOption, any>('/productcard/updateoption', updateData)
            )
        },
    },
}