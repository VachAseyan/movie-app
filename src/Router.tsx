import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import MainLayout from "./components/Layout/Layout";
import Favorites from "./components/Favorites/Favorites";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchMovies from "./components/SearchMovies/SearchMovies";

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
    path: "*",
    element: <PageNotFound />
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
        path: "movies/:movieId",
        element: <ProtectedRoute><MovieDetails /></ProtectedRoute>
      },
      {
        path: "favorites",
        element: <ProtectedRoute><Favorites /></ProtectedRoute>
      },
      {
        path: "search/:searchQuery/page/:pageId",
        element: <ProtectedRoute><SearchMovies /></ProtectedRoute>
      }

    ],

  },
]);