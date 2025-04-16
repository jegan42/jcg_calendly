// src/hooks/useAuth.ts
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import axiosInstance from "../services/axios";

const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                try {
                    const { data } = await axiosInstance.get("/auth/me");
                    if (data?.user) {
                        dispatch({
                            type: "auth/login",
                            payload: { token: data.token, user: data.user },
                        });
                        navigate("/dashboard");
                    } else {
                        navigate("/login");
                    }
                } catch (err) {
                    console.log("Pas d'utilisateur connecté, erreur:", err);
                    navigate("/login");
                }
            }
        };
        fetchUser();
    }, [dispatch, navigate, token]);

    return token;
};

export default useAuth;
