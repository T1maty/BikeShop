import $api from "../../../../shared/http/axios"
import {AxiosResponse} from "axios"

export interface ProductSpecification {
    id: number
    name: string
    productId: number
    sortOrder: number
    description: string

    createdAt: string
    updatedAt: string
    enabled: boolean
}

export const EditProductCardModalAPI = {
    getSpecifications(): Promise<AxiosResponse<Array<ProductSpecification>>> {
        return (
            $api.get<Array<ProductSpecification>>('/productcard/getallspecifications')
        )
    }
}