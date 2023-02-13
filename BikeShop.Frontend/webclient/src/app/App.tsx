import React, {Suspense} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {RouterProvider} from "react-router-dom";
import {Routes} from "./allRoutes";
import {LangSwitcher} from "../widgets/workspace/LangSwitcher/LangSwitcher";
import './styles/index.scss'
import {useTheme} from "./providers/ThemeProvider";
import {ThemeSwitcher} from "../shared/ui/ThemeSwitcher/ThemeSwitcher";


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
                <CssBaseline/>
                <Suspense>
                    <RouterProvider router={Routes}/>
                </Suspense>
            </ThemeProvider>
            <div style={{position: "absolute", right: 500, top: 0}}>
                <LangSwitcher/>
                <ThemeSwitcher/>
            </div>
        </div>
    );
};

export default App;
