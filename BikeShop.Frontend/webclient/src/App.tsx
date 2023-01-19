import React, {
  // lazy,
  Suspense
} from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import MainPage from './components/pages/MainPage';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

const App: React.FC = () => {



  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <div>Header</div>
          <Suspense>
            <Routes>
              <Route path='/' element={<MainPage />} />


              <Route path='*' element={<div>Not Found</div>} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
