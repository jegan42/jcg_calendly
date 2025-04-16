// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { JSX } from "react";

type ProtectedRouteProps = {
    children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = useAuth();

    if (!token) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
