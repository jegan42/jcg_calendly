import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import axiosInstance from "../services/axios";

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await axiosInstance.get("/auth/logout");
                dispatch(logout());
            } catch (error) {
                console.error("Erreur lors de la déconnexion:", error);
            } finally {
                navigate("/login");
            }
        };
        logoutUser();
    }, [dispatch, navigate]);

    return (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
            🔒 Déconnexion en cours...
        </p>
    );
};

export default Logout;
