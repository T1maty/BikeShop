import {createBrowserRouter} from "react-router-dom";
import {
    Cashbox,
    Catalog,
    LoginPage,
    MainPage,
    Order,
    ProductCatalog,
    Profile,
    RegistrationPage,
    Service,
    ShopMain,
    ShopProductItem,
    ShopWrapper
} from "../../pages";
import {OnlyWithoutAuthRoute, WorkspaceHeaderProvider} from "../../entities";
import {WorkCatalog} from "../../pages/workspace/WorkCatalog";
import {BikeShopPaths} from "./paths";
import {BarcodeScanerListenerProvider} from "../providers/BarcodeScanerListenerProvider/BarcodeScanerListenerProvider";
import CheckAuthRoute from "../providers/RouteProviders/CheckAuthRoute";


// @ts-ignore
export const Routes = createBrowserRouter([

    ////                    ////
    ////    Авторизация     ////
    ////                    ////

    {
        path: BikeShopPaths.WORKSPACE.LOGIN,
        element: <OnlyWithoutAuthRoute>
            <LoginPage/>
        </OnlyWithoutAuthRoute>
    },
    {
        path: BikeShopPaths.WORKSPACE.REGISTRATION,
        element: <OnlyWithoutAuthRoute>
            <RegistrationPage/>
        </OnlyWithoutAuthRoute>
    },

    ////                                        ////
    ////    Страницы без ограничения доступа    ////
    ////                                        ////

    // для Cashbox
    {
        path: BikeShopPaths.WORKSPACE.CASHBOX,
        element: <WorkspaceHeaderProvider>
            <Cashbox/>
        </WorkspaceHeaderProvider>
    },
    // для Service
    {
        path: BikeShopPaths.WORKSPACE.SERVICE,
        element: <WorkspaceHeaderProvider>
            <Service/>
        </WorkspaceHeaderProvider>
    },
    // для ShopMain
    {
        path: BikeShopPaths.SHOP.HOME,
        element: <ShopMain/>
    },
    {
        path: BikeShopPaths.SHOP.HOME_NULL,
        element: <ShopMain/>
    },
    {
        path: '/shop/catalog',
        element: <ShopWrapper>
            <Catalog/>
        </ShopWrapper>
    },
    {
        path: '/shop/catalog/id',
        element: <ShopWrapper>
            <ShopProductItem/>
        </ShopWrapper>
    },
    {
        path: '/shop/profile',
        element: <ShopWrapper>
            <Profile/>
        </ShopWrapper>
    },
    {
        path: '/shop/order',
        element: <ShopWrapper>
            <Order/>
        </ShopWrapper>
    },

    ////                                        ////
    ////    Страницы только для залогиненых     ////
    ////                                        ////

    {
        path: BikeShopPaths.WORKSPACE.MAIN_PAGE,
        element: <CheckAuthRoute>
            <BarcodeScanerListenerProvider>
                <WorkspaceHeaderProvider>
                    <MainPage/>
                </WorkspaceHeaderProvider>
            </BarcodeScanerListenerProvider>
        </CheckAuthRoute>
    },
    {
        path: BikeShopPaths.WORKSPACE.PRODUCT_CATALOG,
        element: <CheckAuthRoute>
            <WorkspaceHeaderProvider>
                <ProductCatalog/>
            </WorkspaceHeaderProvider>
        </CheckAuthRoute>
    },
    {
        path: BikeShopPaths.WORKSPACE.WORK_CATALOG,
        element: <CheckAuthRoute>
            <WorkspaceHeaderProvider>
                <WorkCatalog/>
            </WorkspaceHeaderProvider>
        </CheckAuthRoute>
    },
])
