import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from '@mui/material'
import {theme} from "./shared/theme.tsx";

import "./index.css";
import {BrowserRouter} from "react-router";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
)
