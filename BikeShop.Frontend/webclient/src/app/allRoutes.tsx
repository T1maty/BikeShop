import {createBrowserRouter} from "react-router-dom";
import {Cashbox, Home, LoginPage, MainPage, ProductCatalog, RegistrationPage, Service} from "../pages";
import {CheckAuthRoute, OnlyWithoutAuthRoute, PublicHeaderProvider, WorkspaceHeaderProvider} from "../entities";


// @ts-ignore
export const Routes = createBrowserRouter([

    ////                    ////
    ////    Авторизация     ////
    ////                    ////

    {
        path: '/login',
        element: <OnlyWithoutAuthRoute>
            <LoginPage/>
        </OnlyWithoutAuthRoute>
    },
    {
        path: '/registration',
        element: <OnlyWithoutAuthRoute>
            <RegistrationPage/>
        </OnlyWithoutAuthRoute>
    },

    ////                                        ////
    ////    Страницы без ограничения доступа    ////
    ////                                        ////

    {
        path: '/',
        element: <PublicHeaderProvider>
            <Home/>
        </PublicHeaderProvider>
    },
    {
        path: '/Home',
        element: <PublicHeaderProvider>
            <Home/>
        </PublicHeaderProvider>
    },
    // для Cashbox
    {
        path: '/cashbox',
        element: <WorkspaceHeaderProvider>
            <Cashbox/>
        </WorkspaceHeaderProvider>
    },
    // для Service
    {
        path: '/service',
        element: <WorkspaceHeaderProvider>
            <Service/>
        </WorkspaceHeaderProvider>
    },

    ////                                        ////
    ////    Страницы только для залогиненых     ////
    ////                                        ////

    {
        path: '/mainpage',
        element: /*<CheckAuthRout>*/
            <WorkspaceHeaderProvider>
                <MainPage/>
            </WorkspaceHeaderProvider>
        /*</CheckAuthRout>*/
    },
    {
        path: '/productcatalog',
        element: <CheckAuthRoute>
            <WorkspaceHeaderProvider>
                <ProductCatalog/>
            </WorkspaceHeaderProvider>
        </CheckAuthRoute>
    },
])