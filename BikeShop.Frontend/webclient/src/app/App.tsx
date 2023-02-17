import React, {Suspense} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {RouterProvider} from "react-router-dom";
import {Routes} from "./routes/routes";
import {useTheme} from "./providers/ThemeProvider";
import './styles/index.scss'
import {SnackbarProvider} from "notistack";
import Buttons from "../widgets/workspace/AdminMenu/ui/Buttons";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});

const App: React.FC = () => {

    const {theme} = useTheme()

    return (
        <div className={`app ${theme}`}>
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
