export interface GetUsersResponse {
    users: [
        {
            user: UserObj,
            userRoles: string[]
        }
    ]
}

export interface UserResponse {
    user: UserObj
    userRoles: string[]
}

export interface UserObj {
    id: string
    userName: string
    normalizedUserName: string
    email: string
    normalizedEmail: string
    emailConfirmed: true
    passwordHash: string
    securityStamp: string
    concurrencyStamp: string
    phoneNumber: string
    phoneNumberConfirmed: true
    twoFactorEnabled: true
    lockoutEnd: string
    lockoutEnabled: true
    accessFailedCount: number
    firstName: string
    lastName: string
    patronymic: string
    shopId: number
    balance: number
    balanceCurrencyId: number
    creditLimit: number
}