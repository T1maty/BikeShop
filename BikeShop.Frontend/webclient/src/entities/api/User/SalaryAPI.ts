import {$api} from "../../../shared"
import {SalaryResponse} from '../../responses/SalaryResponse'
import {AxiosResponse} from 'axios'
import {UpdateSalaryParams} from "../../requests/UpdateSalaryParams"

export const SalaryAPI = {
    getEmployeeSalaryById(userId: string): Promise<AxiosResponse<SalaryResponse>> {
        return (
            $api.get<SalaryResponse>(`/salary/byuser?UserId=${userId}`)
        )
    },
    updateEmployeeSalary(params: UpdateSalaryParams): Promise<AxiosResponse<SalaryResponse>> {
        return (
            $api.put<SalaryResponse>(`/salary/update`, null, {params})
        )
    },
}