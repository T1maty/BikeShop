export interface User {
    shopId: number
    id: string
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