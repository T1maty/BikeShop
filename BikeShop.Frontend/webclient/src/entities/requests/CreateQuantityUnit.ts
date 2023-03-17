export interface CreateQuantityUnit {
    name: string
    fullName: string
    groupId: number
    baseCoeficient: number
    isDefaultInGroup: boolean
    isSwitchable: boolean
    isSplittable: boolean
}

export interface UpdateQuantityUnit extends CreateQuantityUnit {
    id: number
    enabled: boolean
}