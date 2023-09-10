export interface UpdateCategory {
    id: number
    name: string
    parentId: number
    isCollapsed: boolean
    isRetailVisible: boolean
    isB2BVisible: boolean
    sortOrder: number
}