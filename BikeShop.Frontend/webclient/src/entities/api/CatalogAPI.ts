import {AxiosResponse} from "axios"
import {$api} from "shared"
import {CreateProduct, CreateTag, Product, ProductTag, UpdateProduct} from '../index'

export const CatalogAPI = {
    createProduct(data: CreateProduct): Promise<AxiosResponse<Array<Product>>> {
        return (
            $api.post<Array<Product>>('/product/create', data)
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
}