import {AxiosResponse} from "axios"
import {Product, ProductFullData} from '../index'
import {
    UpdateProductCardFormModel
} from "../../features/ProductCatalogFeatures/EditProductCardModal/models/UpdateProductCardFormModel"
import {$api} from "../../shared";

export const ProductCardAPI = {
    getProductCardById(productId: number): Promise<AxiosResponse<ProductFullData>> {
        return (
            $api.get<ProductFullData>(`/productcard/getproductcard?productId=${productId}`)
        )
    },
    updateProductCard(data: UpdateProductCardFormModel): Promise<any> {
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
    changeCategory(productId: number, categoryId: number): Promise<AxiosResponse<Product>> {
        return (
            $api.put<Product>(`/product/changecategory?ProductId=${productId}&CategoryId=${categoryId}`)
        )
    },
}