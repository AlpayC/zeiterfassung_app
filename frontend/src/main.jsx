import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./user/UserContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";
import ClientThemeWrapper from "./context/ClientThemeWrapper.jsx";
import { ProjectsProvider } from "./context/ProjectContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <UserProvider>
          <ThemeProvider>
            <ClientThemeWrapper>
              <ProjectsProvider>
                <App />
              </ProjectsProvider>
            </ClientThemeWrapper>
          </ThemeProvider>
        </UserProvider>
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
);
