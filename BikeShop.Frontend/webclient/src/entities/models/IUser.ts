export interface IUser {
    id: string
    shopId: number
    lastName: string
    firstName: string
    patronymic: string
    balance: number
    balanceCurrencyId: number
    creditLimit: number
    phoneNumber: string
    phoneNumberConfirmed: boolean
    email: string
    emailConfirmed: boolean
}