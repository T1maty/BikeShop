export interface GetCatalogDataSearchRequest {
    querry: string
    storageId: number
    page: number
    pageSize: number
    filtersVariantIds: number []
    sortingSettings: string[]
}