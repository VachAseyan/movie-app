import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import MainLayout from "./components/Layout/Layout";
import Favorites from "./components/Favorites/Favorites";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "home",
            element: (
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "favorites",
            element: (
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
