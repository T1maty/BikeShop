import {AxiosResponse} from "axios"
import {$api} from "shared"
import {CatalogProductItem, ProductOption, ProductSpecification} from '../index'

export const ProductCardAPI = {
    getProductCardById(productId: number): Promise<AxiosResponse<CatalogProductItem>> {
        return (
            $api.get<CatalogProductItem>(`/productcard/getproductcard?productId=${productId}`)
        )
    },
    updateProductCard(): Promise<AxiosResponse<CatalogProductItem>> {
        return (
            $api.put<CatalogProductItem>(`/productcard/updateproductcard`)
        )
    },
    getOptions(): Promise<AxiosResponse<ProductOption[]>> {
        return (
            $api.get<ProductOption[]>('/productcard/getalloptions')
        )
    },
    getSpecifications(): Promise<AxiosResponse<ProductSpecification[]>> {
        return (
            $api.get<ProductSpecification[]>('/productcard/getallspecifications')
        )
    },
    uploadNewImage(data: any): Promise<any> {
        const productId = 2
        return (
            $api.post<any>(`/product/addimagetoproduct?productId=${productId}`, data)
        )
    },
}