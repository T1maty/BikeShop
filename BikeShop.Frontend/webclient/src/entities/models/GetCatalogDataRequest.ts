export interface GetCatalogDataRequest {
    categoryId: number
    storageId: number
    page: number
    pageSize: number
    filtersVariantIds: number []
    sortingSettings: string[]
}