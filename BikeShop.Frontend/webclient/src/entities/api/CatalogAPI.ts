import {AxiosResponse} from "axios"
import {$api} from "shared"
import {
    CreateProduct,
    CreateTag,
    Product,
    ProductExtended,
    ProductStorageQuantity,
    ProductTag,
    ProductTagResponse,
    UpdateProduct,
    UpdateProductPrices
} from '../index'

export const CatalogAPI = {
    searchProductByName(inputValue: string): Promise<AxiosResponse<Product[]>> {
        return (
            $api.get<Product[]>(`/product/search?querry=${inputValue}`)
        )
    },
    getProductByTag(value: any): Promise<AxiosResponse<Product[]>> {
        return (
            $api.get<Product[]>('/product/getbytags/' + value + '?storageId=1')
        )
    },
    createProduct(data: CreateProduct): Promise<AxiosResponse<Product[]>> {
        return (
            $api.post<Product[]>('/product/create', data)
        )
    },
    updateProduct(data: UpdateProduct): any {
        return (
            $api.put<UpdateProduct>('/product/update', data)
        )
    },
    updateProductPrices(data: UpdateProductPrices): Promise<AxiosResponse<Product>> {
        return (
            $api.put<Product>('/product/updateprices', data)
        )
    },
    getUnsorted(storageId: number): Promise<AxiosResponse<ProductExtended[]>> {
        return (
            $api.get<ProductExtended[]>(`/product/unsorted?storageId=${storageId}`)
        )
    },

    fetchTags(): Promise<AxiosResponse<ProductTagResponse>> {
        return (
            $api.get<ProductTagResponse>('/tag/getall')
        )
    },
    createProductTag(tag: CreateTag): any {
        return (
            $api.post<ProductTag>('/tag/create', tag)
        )
    },
    getStorageProductIds(storageId: string): Promise<AxiosResponse<ProductStorageQuantity[]>> {
        return (
            $api.get<ProductStorageQuantity[]>(`/storage/getidsbystorage?storageId=${storageId}`)
        )
    },
    getProductsByIds(data: number[]): Promise<AxiosResponse<Product[]>> {
        return (
            $api.post<Product[]>(`/product/getbyids`, data)
        )
    },
    getProductByBarcode(barcode: string): Promise<AxiosResponse<Product>> {
        return (
            $api.get<Product>(`/product/getbybarcode/${barcode}`,)
        )
    },
}