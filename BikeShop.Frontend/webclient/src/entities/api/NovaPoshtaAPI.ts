import {AxiosResponse} from "axios";
import {NPResponseWrapper} from "../models/NovaPoshta/Response/NPResponseWrapper";
import {NPCityResponse} from "../models/NovaPoshta/Response/NPCityResponse";
import $NovaPoshtaApi from "../../shared/http/NovaPoshta";
import {NPRequestWrapper} from "../models/NovaPoshta/Request/NPRequestWrapper";
import {NPCitySearchRequest} from "../models/NovaPoshta/Request/NPCitySearchRequest";
import {NPWarehouseSearchRequest} from "../models/NovaPoshta/Request/NPWarehouseSearchRequest";
import {NPWarehouseResponse} from "../models/NovaPoshta/Response/NPWarehouseResponse";

export const NovaPoshtaAPI = {
    CitySearch(dto: NPRequestWrapper<NPCitySearchRequest>): Promise<AxiosResponse<NPResponseWrapper<NPCityResponse>>> {
        return (
            $NovaPoshtaApi.post<NPResponseWrapper<NPCityResponse>>(``, dto)
        )
    },
    WarehouseSearch(dto: NPRequestWrapper<NPWarehouseSearchRequest>): Promise<AxiosResponse<NPResponseWrapper<NPWarehouseResponse>>> {
        return (
            $NovaPoshtaApi.post<NPResponseWrapper<NPWarehouseResponse>>(``, dto)
        )
    },
}