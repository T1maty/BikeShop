import React, {Suspense} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Header} from "../widgets";
import {LoginPage, MainPage, RegistrationPage, WorkCatalog} from "../pages";

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
                <Router>
                    <Header/>
                    <Suspense>
                        <Routes>
                            <Route path="/registration" element={<RegistrationPage/>}/>
                            <Route path="/workcatalog" element={<WorkCatalog/>}/>
                            <Route path="/" element={<LoginPage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/main" element={<MainPage/>}/>
                            <Route path="*" element={<div>Not Found</div>}/>
                        </Routes>
                    </Suspense>
                </Router>
            </ThemeProvider>
        </div>
    );
};

export default App;
