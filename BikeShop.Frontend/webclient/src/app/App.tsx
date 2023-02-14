import React, {Suspense} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {RouterProvider} from "react-router-dom";
import {Routes} from "./allRoutes";
import {LangSwitcher} from "../widgets/workspace/LangSwitcher/LangSwitcher";
import {useTheme} from "./providers/ThemeProvider";
import {ThemeSwitcher} from "../shared/ui/ThemeSwitcher/ThemeSwitcher";
import './styles/index.scss'
import {SnackbarProvider} from "notistack";

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
            <div style={{position: "absolute", left: 0, top: 0}}>
                <div style={{marginBottom: 10}}>
                    <ThemeSwitcher/>
                </div>
                <div>
                    <LangSwitcher/>
                </div>
            </div>
        </div>
    );
};

export default App;
