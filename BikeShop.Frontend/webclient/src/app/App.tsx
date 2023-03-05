import React, {FC, Suspense} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {RouterProvider} from "react-router-dom";
import {Routes} from "./routes/routes";
import './styles/index.scss'
import {SnackbarProvider} from "notistack";
import Buttons from "../widgets/workspace/AdminMenu/ui/Buttons";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});

const App: FC = () => {

    return (
        <div className={`app`}>
            <ThemeProvider theme={darkTheme}>
                <SnackbarProvider maxSnack={3}>
                    <CssBaseline/>
                    <Suspense>
                        <RouterProvider router={Routes}/>
                    </Suspense>
                </SnackbarProvider>
            </ThemeProvider>
            <Buttons off={false}/>
        </div>
    );
};

export default App;
