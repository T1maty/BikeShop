import {AxiosResponse} from "axios"
import {$api} from "shared"
import {CatalogProductItem, ProductOption, ProductSpecification} from '../index'

export const ProductCardAPI = {
    getProductCard(productId: number): Promise<AxiosResponse<CatalogProductItem>> {
        return (
            $api.get<CatalogProductItem>(`/productcard/getproductcardproductId=${productId}`)
        )
    },
    getOptions(): Promise<AxiosResponse<Array<ProductOption>>> {
        return (
            $api.get<Array<ProductOption>>('/productcard/getalloptions')
        )
    },
    getSpecifications(): Promise<AxiosResponse<Array<ProductSpecification>>> {
        return (
            $api.get<Array<ProductSpecification>>('/productcard/getallspecifications')
        )
    },
    uploadNewImage(data: any): Promise<any> {
        const productId = 1
        return (
            $api.post<any>(`/product/addimagetoproduct?productId=${productId}`, data)
        )
    },
}