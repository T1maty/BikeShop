import {createBrowserRouter} from "react-router-dom";
import {Cashbox, Catalog, Home, LoginPage, MainPage, Order, ProductCatalog,
    RegistrationPage, Service, ShopMain, ShopProductItem, ShopWrapper, Profile
} from "../../pages";
import {OnlyWithoutAuthRoute, PublicHeaderProvider, WorkspaceHeaderProvider, CheckAuthRouteProvider} from "../../entities";
import {WorkCatalog} from "../../pages/workspace/WorkCatalog";
import {BikeShopPaths} from "./paths";
import {BarcodeScanerListenerProvider} from "../providers/BarcodeScanerListenerProvider/BarcodeScanerListenerProvider";

// @ts-ignore
export const routes = createBrowserRouter([

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

    {
        path: BikeShopPaths.WORKSPACE.HOME_NULL,
        element: <PublicHeaderProvider>
            <Home/>
        </PublicHeaderProvider>
    },
    {
        path: BikeShopPaths.WORKSPACE.HOME,
        element: <PublicHeaderProvider>
            <Home/>
        </PublicHeaderProvider>
    },

    ////                                        ////
    ////    Страницы только для залогиненых     ////
    ////                                        ////

    {
        path: BikeShopPaths.WORKSPACE.MAIN_PAGE,
        element: <CheckAuthRouteProvider>
            <BarcodeScanerListenerProvider>
                <WorkspaceHeaderProvider>
                    <MainPage/>
                </WorkspaceHeaderProvider>
            </BarcodeScanerListenerProvider>
        </CheckAuthRouteProvider>
    },
    {
        path: BikeShopPaths.WORKSPACE.PRODUCT_CATALOG,
        element: <CheckAuthRouteProvider>
            <WorkspaceHeaderProvider>
                <ProductCatalog/>
            </WorkspaceHeaderProvider>
        </CheckAuthRouteProvider>
    },
    {
        path: BikeShopPaths.WORKSPACE.WORK_CATALOG,
        element: <CheckAuthRouteProvider>
            <WorkspaceHeaderProvider>
                <WorkCatalog/>
            </WorkspaceHeaderProvider>
        </CheckAuthRouteProvider>
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

    ////                                        ////
    ////          Интернет-магазин              ////
    ////                                        ////

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
            <ShopProductItem/>
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
])