import {AxiosResponse} from "axios"
import {$api} from "shared"
import {ProductFullData} from '../index'
import {UpdateProductCardRequest}
    from "../../features/ProductCatalogFeatures/EditProductCardModal/models/UpdateProductCardRequest"

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
    uploadNewImage(data: any): Promise<any> {
        const productId = 1 // надо поставить динамический
        return (
            $api.post<any>(`/product/addimagetoproduct?productId=${productId}`, data)
        )
    },
}