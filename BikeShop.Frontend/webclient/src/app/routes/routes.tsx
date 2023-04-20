import {BikeShopPaths} from './paths'
import {createBrowserRouter} from 'react-router-dom'
import {
    ArrivalOfProducts, Cashbox, Catalog, CatalogProductItem, InventoryOfProducts,
    LoginPage, MainPage, Order, ProductCatalog, ProductsWrapper, Profile,
    RegistrationPage, Service, ShopMain, ShopWrapper, WorkCatalog
} from '../../pages'
import {OnlyWithoutAuthRoute, WorkspaceHeaderProvider} from '../../entities'
import {BarcodeScannerListenerProvider}
    from 'app/providers/BarcodeScannerListenerProvider/BarcodeScannerListenerProvider'
import {CheckForServiceWork, ActServiceWork,
    ActGetStuffToService, CheckForShop, ActGetStuffFromService} from 'widgets'

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
        element: <ShopWrapper>
            <ShopMain/>
        </ShopWrapper>

    },
    {
        path: BikeShopPaths.SHOP.HOME,
        element: <ShopWrapper>
            <ShopMain/>
        </ShopWrapper>
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

            <ArrivalOfProducts/>

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

    {
        path: BikeShopPaths.WORKSPACE.SHOP_CHECK,
        element: <CheckForShop/>
    },
    {
        path: BikeShopPaths.WORKSPACE.WORK_CHECK,
        element: <CheckForServiceWork/>
    },
    {
        path: BikeShopPaths.WORKSPACE.WORK_ACT,
        element: <ActServiceWork/>
    },
    {
        path: BikeShopPaths.WORKSPACE.GET_STUFF_TO_SERVICE_ACT,
        element: <ActGetStuffToService/>
    },
    {
        path: BikeShopPaths.WORKSPACE.GET_STUFF_FROM_SERVICE_ACT,
        element: <ActGetStuffFromService/>
    },
])