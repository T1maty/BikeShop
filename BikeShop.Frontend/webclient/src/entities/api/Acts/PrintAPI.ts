import {AxiosResponse} from "axios";
import {$api} from "../../../shared";
import {PrintQueue} from "../../entities/PrintQueue";

export const PrintAPI = {
    addQueue(formData: FormData, actId: number, dataName: string, printSetings: string, priority: number, agentId: number): Promise<AxiosResponse<PrintQueue>> {
        return (
            $api.post<PrintQueue>(`/print/addqueue?actId=${actId}&dataName=${dataName}&printSettings=${printSetings}&prioriry=${priority}&agentId=${agentId}`, formData)
        )
    },
}