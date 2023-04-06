export const BikeShopPaths = {
    COMMON: {
        LOGIN: '/login',
        REGISTRATION: '/registration',
        ERROR404: 'error404', // надо сделать
    },
    SHOP: {
        HOME: '/shop',
        CATALOG: '/shop/catalog',
        PRODUCT: '/shop/catalog/:category/:productId',
        PROFILE: '/shop/profile',
        ORDER: '/shop/order',
    },
    WORKSPACE: {
        MAIN_PAGE: '/workspace/main-page',
        SERVICE: '/workspace/service',
        CASHBOX: '/workspace/cashbox',
        PRODUCT_CATALOG: '/workspace/product-catalog',
        WORK_CATALOG: '/workspace/work-catalog',
        ARRIVAL_OF_PRODUCTS: '/workspace/arrival-of-products',
        INVENTORY_OF_PRODUCTS: '/workspace/inventory-of-products',
        CHECK_ACT: '/workspace/check-act',
        WORK_ACT: '/workspace/work-act',
    },
}