export interface ProductTagForCard {
    id: number
    name: string
    parentId: number

    isCollapsed: boolean
    isRetailVisible: boolean
    isB2BVisible: boolean
    isUniversal: boolean
    sortOrder: number

    enabled: boolean
    createdAt: string
    updatedAt: string
}