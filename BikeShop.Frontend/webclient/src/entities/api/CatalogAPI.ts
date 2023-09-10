import {AxiosResponse} from "axios"

import {
    CreateProduct,
    CreateTag,
    Product,
    ProductExtended,
    ProductStorageQuantity,
    UpdateProduct,
    UpdateProductPrices
} from '../index'
import {$api} from "../../shared";
import {ProductCategory} from "../DataTransferObjects/ProductCategory";

export const CatalogAPI = {
    searchProductByName(inputValue: string): Promise<AxiosResponse<Product[]>> {
        return (
            $api.get<Product[]>(`/product/search?querry=${inputValue}`)
        )
    },
    getProductByCategory(Id: number, Take: number): Promise<AxiosResponse<Product[]>> {
        return (
            $api.get<Product[]>(`/product/getbycategory?Id=${Id}&Take=${Take}`)
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

    fetchTags(): Promise<AxiosResponse<ProductCategory[]>> {
        return (
            $api.get<ProductCategory[]>('/category/getall')
        )
    },
    createProductTag(tag: CreateTag): Promise<AxiosResponse<ProductCategory>> {
        return (
            $api.post<ProductCategory>('/category/create', tag)
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