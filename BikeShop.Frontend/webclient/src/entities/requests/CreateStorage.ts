export interface CreateStorage {
    name: string
    supplyDelay: string
    isOutsource: boolean
}

export interface UpdateStorage extends CreateStorage {
    id: number
    enabled: boolean
}