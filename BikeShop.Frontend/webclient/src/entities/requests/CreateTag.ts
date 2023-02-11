export interface ICreateTag {
    name: string,
    parentId: number,
    isCollapsed: boolean,
    isRetailVisible: boolean,
    isB2BVisible: boolean,
    isUniversal: boolean,
    sortOrder: number
}