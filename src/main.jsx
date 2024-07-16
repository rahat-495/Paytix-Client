
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
import { ThemeProvider } from "@material-tailwind/react";
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import AuthProvider from "./Auth/AuthProvider";
import CustomProvider from "./Auth/CustomProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CustomProvider>
          <QueryClientProvider client={new QueryClient()}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </CustomProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
