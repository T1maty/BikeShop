import {CreateQuantityUnit, UpdateQuantityUnit} from "../requests/CreateQuantityUnit"

export interface GetQuantityUnitResponse extends UpdateQuantityUnit {
    // id: number
    // enable: boolean
    groupName: string
    createdAt: string
    updatedAt: string
}