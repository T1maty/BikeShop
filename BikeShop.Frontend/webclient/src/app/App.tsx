import React, {Suspense} from "react"
import './styles/index.scss'
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {RouterProvider} from "react-router-dom"
import {SnackbarProvider} from "notistack"
import Buttons from "../widgets/workspace/AdminMenu/ui/Buttons"
import {routes} from './routes/routes'

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})

export const App = () => {

    return (
        <div className={`app`}>
            <ThemeProvider theme={darkTheme}>
                <SnackbarProvider maxSnack={3}>
                    {/*<CssBaseline/>*/}
                    <Suspense>
                        <RouterProvider router={routes}/>
                    </Suspense>
                </SnackbarProvider>
            </ThemeProvider>
            {/*<Buttons off={false}/>*/}
        </div>
    )
}