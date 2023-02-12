import React, {Suspense} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";

// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import {RouterProvider} from "react-router-dom";
import {Routes} from "./allRoutes";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Suspense>
                    <RouterProvider router={Routes}/>
                </Suspense>
            </ThemeProvider>
        </div>
    );
};

export default App;
