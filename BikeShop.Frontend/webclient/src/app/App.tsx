import React, {Suspense} from "react"
import './styles/index.scss'
import {RouterProvider} from "react-router-dom"
import {SnackbarProvider} from "notistack"
import Buttons from "../widgets/workspace/AdminMenu/ui/Buttons"
import {routes} from './routes/routes'

export const App = () => {

    return (
        <div className={`app`}>
            <SnackbarProvider maxSnack={2}>
                <Suspense>
                    <RouterProvider router={routes}/>
                </Suspense>
            </SnackbarProvider>
            <Buttons off={true}/>
        </div>
    )
}