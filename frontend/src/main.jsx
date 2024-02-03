import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./user/UserContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";
import ClientThemeWrapper from "./context/ClientThemeWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <ClientThemeWrapper>
            <AlertProvider>
              <App />
            </AlertProvider>
          </ClientThemeWrapper>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
