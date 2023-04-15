import {AxiosResponse} from "axios"
import {$api} from "shared"
import {ProductFullData} from '../index'
import {
    UpdateProductCardRequest
} from "../../features/ProductCatalogFeatures/EditProductCardModal/models/UpdateProductCardRequest"

export const ProductCardAPI = {
    getProductCardById(productId: number): Promise<AxiosResponse<ProductFullData>> {
        return (
            $api.get<ProductFullData>(`/productcard/getproductcard?productId=${productId}`)
        )
    },
    updateProductCard(data: UpdateProductCardRequest): any {
        return (
            $api.put('/productcard/updateproductcard', data)
        )
    },
    uploadNewImage(data: any, productId: number): Promise<any> {
        return (
            $api.post<any>(`/product/addimagetoproduct?productId=${productId}`, data)
        )
    },
    deleteImage(imageId: number): Promise<any> {
        return (
            $api.post<any>(`/product/deleteimage?imageId=${imageId}`)
        )
    },
}