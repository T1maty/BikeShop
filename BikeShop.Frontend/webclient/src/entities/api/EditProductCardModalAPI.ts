import {AxiosResponse} from "axios"
import { $api } from "shared"
import {ProductSpecification} from "../index"

export const EditProductCardModalAPI = {
    getSpecifications(): Promise<AxiosResponse<Array<ProductSpecification>>> {
        return (
            $api.get<Array<ProductSpecification>>('/productcard/getallspecifications')
        )
    }
}