import {CreateStorage} from '../requests/CreateStorage'

export interface CreateStorageResponse extends CreateStorage {
    id: number
    enabled: boolean
    createdAt: string
    updatedAt: string
}