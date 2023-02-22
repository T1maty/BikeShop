import {createBrowserRouter} from "react-router-dom";
import {Cashbox, Home, LoginPage, MainPage, ProductCatalog, RegistrationPage, Service} from "../../pages";
import {OnlyWithoutAuthRoute, PublicHeaderProvider, WorkspaceHeaderProvider} from "../../entities";
import {WorkCatalog} from "../../pages/workspace/WorkCatalog";
import {BikeShopPaths} from "./paths";
import {BarcodeScanerListenerProvider} from "../providers/BarcodeScanerListenerProvider/BarcodeScanerListenerProvider";


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

    ////                                        ////
    ////    Страницы только для залогиненых     ////
    ////                                        ////

    {
        path: BikeShopPaths.WORKSPACE.MAIN_PAGE,
        element: /*<CheckAuthRout>*/
            <BarcodeScanerListenerProvider>
                <WorkspaceHeaderProvider>
                    <MainPage/>
                </WorkspaceHeaderProvider>
            </BarcodeScanerListenerProvider>
        /*</CheckAuthRout>*/
    },
    {
        path: BikeShopPaths.WORKSPACE.PRODUCT_CATALOG,
        element: /*<CheckAuthRoute>*/
            <WorkspaceHeaderProvider>
                <ProductCatalog/>
            </WorkspaceHeaderProvider>
        // </CheckAuthRoute>
    },
    {
        path: BikeShopPaths.WORKSPACE.WORK_CATALOG,
        element: /*<CheckAuthRoute>*/
            <WorkspaceHeaderProvider>
                <WorkCatalog/>
            </WorkspaceHeaderProvider>
        // </CheckAuthRoute>
    },
])
