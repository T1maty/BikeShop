export interface ProductImageRequest {
    id: number,
    sortOrder: number,
    url?: string,
    image?: File
    enabled: boolean
}