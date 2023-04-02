export interface ProductTag {
    id: string
    name: string
    parentId: string

    isCollapsed: boolean
    isRetailVisible: boolean
    isB2BVisible: boolean
    isUniversal: boolean
    sortOrder: number

    createdAt: string
    updatedAt: string
    enabled: boolean
}