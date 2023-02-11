import {OnlyWithoutAuthRout, WorkspaceHeaderProvider} from "../entities/index";
import {createBrowserRouter} from "react-router-dom";
import {Home, LoginPage, MainPage, ProductCatalog, RegistrationPage} from "../pages";
import {CheckAuthRout, PublicHeaderProvider} from "../entities";
import {Cashbox} from "../pages";


// @ts-ignore
export const Routes = createBrowserRouter([

    ////                    ////
    ////    Авторизация     ////
    ////                    ////

    {
        path: '/login',
        element: <OnlyWithoutAuthRout>
            <LoginPage/>
        </OnlyWithoutAuthRout>
    },
    {
        path: '/registration',
        element: <OnlyWithoutAuthRout>
            <RegistrationPage/>
        </OnlyWithoutAuthRout>
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
    // для проверки Cashbox
    {
        path: '/cashbox',
        element: <WorkspaceHeaderProvider>
            <Cashbox/>
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
        element: <CheckAuthRout>
            <WorkspaceHeaderProvider>
                <ProductCatalog/>
            </WorkspaceHeaderProvider>
        </CheckAuthRout>
    },
])