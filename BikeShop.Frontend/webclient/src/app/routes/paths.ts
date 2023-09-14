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
        PUBLIC_OFFER: '/public-offer',
        ABOUT_US: '/about-us',
        DELIVERY_INFO: '/delivery'
    },
    WORKSPACE: {
        MAIN_PAGE: '/workspace/main-page',
        SERVICE: '/workspace/service',
        CASHBOX: '/workspace/cashbox',
        PRODUCT_CATALOG: '/workspace/product-catalog',
        WORK_CATALOG: '/workspace/work-catalog',
        PROFILE: '/workspace/profile',
        ADMIN: '/workspace/admin',
        CRM: '/workspace/crm',
        ORDERS: '/workspace/orders',
        SCHEDULE: '/workspace/schedule',

        ARRIVAL_OF_PRODUCTS: '/workspace/arrival-of-products',
        OUTCOME_ACT: '/workspace/outcome',
        INVENTARIZATION: '/workspace/inventarization',
        STORAGE_PRODUCTS_TRANSFER: '/workspace/storage-products-transfer',

        SHOP_CHECK: '/workspace/shop-check',
        WORK_CHECK: '/workspace/work-check',
        WORK_ACT: '/workspace/work-act',
        GET_STUFF_TO_SERVICE_ACT: '/workspace/get-stuff-to-service-act',
        GET_STUFF_FROM_SERVICE_ACT: '/workspace/get-stuff-from-service-act',
    },
}