import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { RootState } from "../../app/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const location = useLocation();

    const publicRoutes = ['/login', '/register'];

    if (!isLoggedIn && !publicRoutes.includes(location.pathname)) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
