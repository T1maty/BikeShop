import {AxiosResponse} from "axios"
import {$api} from "shared"
import {
    UpdateProductPrices, CreateProduct, CreateTag, Product,
    ProductExtended, ProductTag, UpdateProduct
} from '../index'

export const CatalogAPI = {
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
    createProductTag(tag: CreateTag): any {
        return (
            $api.post<ProductTag>('/tag/create', tag)
        )
    },
    getUnsorted(storageId: number): Promise<AxiosResponse<ProductExtended[]>> {
        return (
            $api.get<ProductExtended[]>(`/product/unsorted?srorageId=${storageId}`)
        )
    },

    updateProductPrices(data: UpdateProductPrices): Promise<AxiosResponse<Product>> {
        return (
            $api.put<Product>('/product/updateprices', data)
        )
    },
}