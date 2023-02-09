import {OnlyWithoutAuthRout, WorkspaceHeaderProvider} from "../entities/index";
import {createBrowserRouter} from "react-router-dom";
import {Home, LoginPage, MainPage, ProductCatalogPage, RegistrationPage} from "../pages";
import {CheckAuthRout, PublicHeaderProvider} from "../entities";
import {Cashbox} from '../pages/workspace/Cashbox/Cashbox';


// @ts-ignore
export const Routs = createBrowserRouter([

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
        path: '/home',
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
                <ProductCatalogPage/>
            </WorkspaceHeaderProvider>
        </CheckAuthRout>
    },
])