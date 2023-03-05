export interface getGroups {
   workGroups: Groups[]
}


export interface Groups {
    id: number,
    createdAt: string,
    updatedAt: string,
    enabled: boolean,
    name: string,
    parentId: number,
    isCollapsed: boolean,
    shopId: number
}
