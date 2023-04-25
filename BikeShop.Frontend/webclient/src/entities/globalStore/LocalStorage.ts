export const LocalStorage = {
    userId() {
        return localStorage.getItem('userId')
    },
    shopId() {
        return localStorage.getItem('shopId')
    },
    accessToken() {
        return localStorage.getItem('accessToken')
    }
}