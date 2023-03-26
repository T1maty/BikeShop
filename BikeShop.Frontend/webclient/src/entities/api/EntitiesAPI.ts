import {AxiosResponse} from "axios"
import {$api} from "shared"
import {CreateShopResponse} from "../responses/ShopResponse"
import {CreateShop, UpdateShop} from "../requests/CreateShop"
import {GetQuantityUnitResponse} from "../responses/QuantityUnitResponse"
import {CreateQuantityUnit, UpdateQuantityUnit} from "../requests/CreateQuantityUnit"
import {CreateStorageResponse} from "../responses/StorageResponse"
import {CreateStorage, UpdateStorage} from "../requests/CreateStorage"

export const EntitiesAPI = {
    Archive: {
        getAllServicesInfo(): Promise<AxiosResponse<Array<any>>> {
            return (
                $api.get<Array<any>>('/service/getbyshopid/1')
            )
        },
    },

    Shop: {
        getShops(): Promise<AxiosResponse<Array<CreateShopResponse>>> {
            return (
                $api.get<Array<CreateShopResponse>>('/shop/getall')
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
        getStorages(): Promise<AxiosResponse<Array<CreateStorageResponse>>> {
            return (
                $api.get<Array<CreateStorageResponse>>('/storagecrud/getall')
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
        getQuantityUnits(): Promise<AxiosResponse<Array<GetQuantityUnitResponse>>> {
            return (
                $api.get<Array<GetQuantityUnitResponse>>('/quantityunit/getall')
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
}