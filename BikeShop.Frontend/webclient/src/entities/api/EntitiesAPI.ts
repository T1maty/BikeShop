import {AxiosResponse} from "axios"
import {$api} from "shared"
import {CreateShopResponse} from "../responses/ShopResponse"
import {CreateShop, UpdateShop} from "../requests/CreateShop"
import {GetQuantityUnitResponse} from "../responses/QuantityUnitResponse"
import {CreateQuantityUnit, UpdateQuantityUnit} from "../requests/CreateQuantityUnit"
import {CreateStorageResponse} from "../responses/StorageResponse"
import {CreateStorage, UpdateStorage} from "../requests/CreateStorage"
import {Specification} from '../models/Others/Specification'
import {CreateSpecification} from '../requests/CreateSpecification'
import {UpdateSpecification} from '../requests/UpdateSpecification';

export const EntitiesAPI = {
    Archive: {
        getAllServicesInfo(): Promise<AxiosResponse<any[]>> {
            return (
                $api.get<any[]>('/service/getbyshopid/1')
            )
        },
    },

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
        addNewStorage(data: CreateStorage): any {
            return (
                $api.post<CreateStorage>('/storagecrud/create', data)
            )
        },
        updateStorageInfo(updateData: UpdateStorage): any {
            return (
                $api.put<UpdateStorage>('/storagecrud/update', updateData)
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

    },

    Specification: {
        addNewSpecification(data: CreateSpecification): any {
            return (
                $api.post<CreateSpecification>('/productcard/createspecification', data)
            )
        },
        updateSpecification(updateData: UpdateSpecification): any {
            return (
                $api.put<UpdateSpecification>('/productcard/updatespecification', updateData)
            )
        },
    },
}