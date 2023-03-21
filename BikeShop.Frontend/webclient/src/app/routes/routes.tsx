import {BikeShopPaths} from './paths'
import {createBrowserRouter} from 'react-router-dom'
import {
    Cashbox, Catalog, LoginPage, MainPage, Order, ProductCatalog, RegistrationPage, Service,
    ShopMain, CatalogProductItem, ShopWrapper, Profile, ProductsWrapper, ArrivalOfProducts, InventoryOfProducts
} from '../../pages'
import {
    OnlyWithoutAuthRoute, PublicHeaderProvider,
    WorkspaceHeaderProvider, CheckAuthRouteProvider
} from '../../entities'
import {WorkCatalog} from '../../pages/workspace/WorkCatalog'
import {BarcodeScannerListenerProvider}
    from 'app/providers/BarcodeScannerListenerProvider/BarcodeScannerListenerProvider'

// @ts-ignore
export const routes = createBrowserRouter([

    ////                    ////
    ////    Авторизация     ////
    ////                    ////

    {
        path: BikeShopPaths.COMMON.LOGIN,
        element: <OnlyWithoutAuthRoute>
            <LoginPage/>
        </OnlyWithoutAuthRoute>
    },
    {
        path: BikeShopPaths.COMMON.REGISTRATION,
        element: <OnlyWithoutAuthRoute>
            <RegistrationPage/>
        </OnlyWithoutAuthRoute>
    },

    ////                                        ////
    ////          Интернет-магазин              ////
    ////                                        ////

    {
        path: '/',
        element: <ShopMain/>

    },
    {
        path: BikeShopPaths.SHOP.HOME,
        element: <ShopMain/>
    },
    {
        path: BikeShopPaths.SHOP.CATALOG,
        element: <ShopWrapper>
            <Catalog/>
        </ShopWrapper>
    },
    {
        path: BikeShopPaths.SHOP.PRODUCT,
        element: <ShopWrapper>
            <CatalogProductItem/>
        </ShopWrapper>
    },
    {
        path: BikeShopPaths.SHOP.PROFILE,
        element: <ShopWrapper>
            <Profile/>
        </ShopWrapper>
    },
    {
        path: BikeShopPaths.SHOP.ORDER,
        element: <ShopWrapper>
            <Order/>
        </ShopWrapper>
    },

    // {
    //     path: BikeShopPaths.WORKSPACE.HOME_NULL,
    //     element: <PublicHeaderProvider>
    //         <_Home/>
    //     </PublicHeaderProvider>
    // },
    // {
    //     path: BikeShopPaths.WORKSPACE.HOME,
    //     element: <PublicHeaderProvider>
    //         <_Home/>
    //     </PublicHeaderProvider>
    // },

    ////                                        ////
    ////    Страницы только для залогиненых     ////
    ////                                        ////

    {
        path: BikeShopPaths.WORKSPACE.MAIN_PAGE,
        element: // <CheckAuthRouteProvider>
            <BarcodeScannerListenerProvider>
                <WorkspaceHeaderProvider>
                    <MainPage/>
                </WorkspaceHeaderProvider>
            </BarcodeScannerListenerProvider>
        // </CheckAuthRouteProvider>
    },
    {
        path: BikeShopPaths.WORKSPACE.PRODUCT_CATALOG,
        element: //<CheckAuthRouteProvider>
            <WorkspaceHeaderProvider>
                <ProductCatalog/>
            </WorkspaceHeaderProvider>
        //</CheckAuthRouteProvider>
    },
    {
        path: BikeShopPaths.WORKSPACE.WORK_CATALOG,
        element: //<CheckAuthRouteProvider>
            <WorkspaceHeaderProvider>
                <WorkCatalog/>
            </WorkspaceHeaderProvider>
        //</CheckAuthRouteProvider>
    },
    {
        path: BikeShopPaths.WORKSPACE.CASHBOX,
        element: <WorkspaceHeaderProvider>
            <Cashbox/>
        </WorkspaceHeaderProvider>
    },
    {
        path: BikeShopPaths.WORKSPACE.SERVICE,
        element: <WorkspaceHeaderProvider>
            <Service/>
        </WorkspaceHeaderProvider>
    },
    {
        path: BikeShopPaths.WORKSPACE.ARRIVAL_OF_PRODUCTS,
        element: <WorkspaceHeaderProvider>
            <ProductsWrapper title={'Новый акт прихода товара'} isUploadFile={true}>
                <ArrivalOfProducts/>
            </ProductsWrapper>
        </WorkspaceHeaderProvider>
    },
    {
        path: BikeShopPaths.WORKSPACE.INVENTORY_OF_PRODUCTS,
        element: <WorkspaceHeaderProvider>
            <ProductsWrapper title={'Новый акт инвентаризации'} isUploadFile={false}>
                <InventoryOfProducts/>
            </ProductsWrapper>
        </WorkspaceHeaderProvider>
    },
])