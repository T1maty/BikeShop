import {OnlyWithoutAuthRout, WorkspaceHeaderProvider} from "../entities/index";
import {createBrowserRouter} from "react-router-dom";
import {Home, LoginPage, MainPage, RegistrationPage} from "../pages";
import {CheckAuthRout} from "../entities";


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
        element: <Home/>
    },
    {
        path: '/home',
        element: <Home/>
    },

    ////                                        ////
    ////    Страницы только для залогиненых     ////
    ////                                        ////

    {
        path: '/mainpage',
        element: <CheckAuthRout>
            <WorkspaceHeaderProvider>
                <MainPage/>
            </WorkspaceHeaderProvider>
        </CheckAuthRout>
    },
])