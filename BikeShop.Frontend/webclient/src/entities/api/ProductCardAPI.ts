import {AxiosResponse} from "axios"
import {$api} from "shared"
import {ProductFullData, ProductSpecification} from '../index'
import {
    UpdateProductCardRequest
} from "../../features/ProductCatalogFeatures/EditProductCardModal/models/UpdateProductCardRequest";
import {
    ProductOptionsWithVariants
} from "../../features/ProductCatalogFeatures/EditProductCardModal/models/ProductOptionsWithVariants";

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
    getOptions(): Promise<AxiosResponse<ProductOptionsWithVariants[]>> {
        return (
            $api.get<ProductOptionsWithVariants[]>('/productcard/getalloptions')
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