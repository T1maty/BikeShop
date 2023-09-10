import {RoleGroupResponse} from "../DataTransferObjects/responses/RoleGroupResponse"
import {RoleToGroupBind} from "./Service/RoleToGroupBind";

export interface RoleGroup {
    group: RoleGroupResponse,
    roles: RoleToGroupBind[]
}