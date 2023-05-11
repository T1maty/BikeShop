export const LocalStorage = {
    userId() {
        return localStorage.getItem('userId')
    },
    shopId() {
        return localStorage.getItem('shopId')
    },
    accessToken() {
        return localStorage.getItem('accessToken')
    },
    currency: {
        id() {
            return parseFloat(localStorage.getItem('currencyId')!)
        },
        fbts() {
            return parseFloat(localStorage.getItem('currencyFBTS')!)
        },
        fstb() {
            return parseFloat(localStorage.getItem('currencyFSTB')!)
        },
        symbol() {
            return localStorage.getItem('currencySymbol')
        },
    }
}