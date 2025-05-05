import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import MainLayout from "./components/Layout/Layout";
import Favorites from "./components/Favorites/Favorites";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MovieDetails from "./components/MovieDetails/MovieDetails";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute><HomePage /></ProtectedRoute>
      },
      {
        path: "page/:pageId",
        element: <ProtectedRoute><HomePage /></ProtectedRoute>
      },
      {
        path: "movie/:movieId",
        element: <ProtectedRoute><MovieDetails /></ProtectedRoute>
      },
      {
        path: "favorites",
        element: <ProtectedRoute><Favorites /></ProtectedRoute>
      },
      {
        path:"*",
        element: <h1>404 Not Found</h1>
      }
    ]
  },
]);