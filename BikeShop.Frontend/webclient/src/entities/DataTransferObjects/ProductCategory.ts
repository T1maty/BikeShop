export interface ProductCategory {
    id: number
    name: string
    way: string
    parentId: number

    isCollapsed: boolean
    isRetailVisible: boolean
    isB2BVisible: boolean
    sortOrder: number

    createdAt: string
    updatedAt: string
    enabled: boolean
}