// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastProvider } from "./context/ToastContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <Router>
                        <ToastProvider>
                            <App />
                        </ToastProvider>
                    </Router>
                </ThemeProvider>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
