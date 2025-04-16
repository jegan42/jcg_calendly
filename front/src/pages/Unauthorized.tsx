// src/pages/Unauthorized.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const Unauthorized = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/login");
        }, 3000);
        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>⛔ Accès interdit</h2>
            <p>Vous n’avez pas les droits pour consulter cette ressource.</p>
            <p>🔒 Accès refusé. Redirection vers la connexion...</p>
            <Button onClick={() => navigate("/login")}>
                🔑 Se connecter maintenant
            </Button>
        </div>
    );
};

export default Unauthorized;
