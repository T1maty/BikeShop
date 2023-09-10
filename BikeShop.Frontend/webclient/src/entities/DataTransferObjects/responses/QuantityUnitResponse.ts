import {UpdateQuantityUnit} from "../requests/CreateQuantityUnit"

export interface GetQuantityUnitResponse extends UpdateQuantityUnit {
    groupName: string
    createdAt: string
    updatedAt: string
}