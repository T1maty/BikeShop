export const BikeShopPaths = {
    COMMON: {
        LOGIN: '/login',
        REGISTRATION: '/registration',
        ERROR404: 'error404', // надо сделать
    },
    SHOP: {
        HOME: '/shop',
        CATALOG: '/shop/catalog',
        PRODUCT: '/shop/catalog/:productId',
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

        SHOP_CHECK: '/workspace/shop-check',

        WORK_CHECK: '/workspace/work-check',
        WORK_ACT: '/workspace/work-act',
        GET_STUFF_TO_SERVICE_ACT: '/workspace/get-stuff-to-service-act',
        GET_STUFF_FROM_SERVICE_ACT: '/workspace/get-stuff-from-service-act',
    },
}