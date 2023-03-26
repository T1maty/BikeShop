import {AxiosResponse} from "axios"
import {$api} from "shared"
import {ProductOption, ProductSpecification} from "../index"

export const ProductCardAPI = {
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