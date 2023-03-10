export interface IQuantityUnit {
    id: number
    name: string,
    fullName: string,
    groupId: number,
    groupName: string,
    isDefaultInGroup: boolean,
    isSwitchable: boolean,
    baseCoeficient: number
}