import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/User/Login.jsx";
import { SnackbarProvider } from "notistack";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { index: true, element: <Home /> },
  { path: "/account/login", element: <Login /> },
  { path: "/*", element: <Home /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
