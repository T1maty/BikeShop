import {RoleGroupResponse} from "../responses/RoleGroupResponse"
import {RoleToGroupBind} from "./Service/RoleToGroupBind";

export interface RoleGroup {
    group: RoleGroupResponse,
    roles: RoleToGroupBind[]
}