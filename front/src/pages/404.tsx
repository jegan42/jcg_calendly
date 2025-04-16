// src/pages/404.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h1>404 - Page non trouvée</h1>
            <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
            <Button onClick={() => navigate("/")}>⬅️ Retour à l’accueil</Button>
        </div>
    );
};

export default NotFound;
