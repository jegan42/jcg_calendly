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
  console.log("useAuth HERE", token);
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {  // Si pas de token dans Redux, on vérifie les cookies
        try {
          const { data } = await axiosInstance.get("/auth/me");
          if (data?.user) {
            // L'utilisateur est authentifié, on l'ajoute à Redux
            dispatch({ type: 'auth/login', payload: { token: data.token, user: data.user } });
            navigate("/dashboard");  // Redirection vers le dashboard
          } else {
            navigate("/login");  // Pas d'utilisateur, redirection vers la page de login
            }
        } catch (err) {
          console.log("Pas d'utilisateur connecté, erreur:", err);
        }
      }
    };
    fetchUser();
  }, [dispatch, navigate, token]);
//   Si pas de token dans Redux et pas d'utilisateur connecté, redirection vers la page de login
//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     }
//   }, [token, navigate]);

console.log("Token before OUT useauth HERE", token);
  return token;
};

export default useAuth;
