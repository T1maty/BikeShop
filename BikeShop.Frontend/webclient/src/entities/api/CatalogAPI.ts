import {AxiosResponse} from "axios"
import {$api} from "shared"
import {
    UpdateProductPrices, CreateProduct, CreateTag, Product,
    ProductExtended, ProductTag, UpdateProduct, ProductTagResponse
} from '../index'

export const CatalogAPI = {
    searchProductByName(inputValue: string): Promise<AxiosResponse<Product[]>> {
        return (
            $api.get<Product[]>(`/product/search?querry=${inputValue}`)
        )
    },
    getProductByTag(value: any): Promise<AxiosResponse<ProductExtended[]>> {
        return (
            $api.get<ProductExtended[]>('/product/getbytags/' + value + '?storageId=1')
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
}