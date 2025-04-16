// front/src/pages/GuestResponse.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import styled from "styled-components";

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 1.8rem;
    margin-bottom: 1rem;
`;

const Message = styled.p<{ success: boolean }>`
    font-size: 1.1rem;
    color: ${(props) => (props.success ? "green" : "red")};
    margin-top: 1rem;
`;

const BackButton = styled.button`
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const GuestResponse: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const event_id = searchParams.get("event_id");
        const guest_email = searchParams.get("guest_email");
        const status = searchParams.get("status"); // accepted | declined | maybe

        // 🔒 Vérifications de sécurité simples côté client
        const validStatus = ["accepted", "declined", "maybe"];
        const isValidEmail = (email: string) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (
            !event_id ||
            !guest_email ||
            !status ||
            !validStatus.includes(status) ||
            !isValidEmail(guest_email)
        ) {
            setMessage("❌ Paramètres invalides ou manquants.");
            setSuccess(false);
            setLoading(false);
            return;
        }

        const sendResponse = async () => {
            try {
                const res = await axiosInstance.post("/response", {
                    event_id,
                    guest_email,
                    status,
                });

                if (res.data.success) {
                    setMessage(
                        "✅ Votre réponse a été enregistrée avec succès !"
                    );
                    setSuccess(true);
                } else {
                    setMessage(
                        "❌ Erreur lors de l'enregistrement de votre réponse."
                    );
                    setSuccess(false);
                }
            } catch (error) {
                console.error(error);
                setMessage("❌ Une erreur est survenue.");
                setSuccess(false);
            } finally {
                setLoading(false);
            }
        };

        sendResponse();
    }, [searchParams]);

    return (
        <Container>
            <Title>Réponse à l'invitation</Title>
            {loading ? (
                <p>⏳ Enregistrement de votre réponse...</p>
            ) : (
                <>
                    <Message success={success}>{message}</Message>
                    <BackButton onClick={() => navigate("/dashboard")}>
                        ⬅ Retour au tableau de bord
                    </BackButton>
                </>
            )}
        </Container>
    );
};

export default GuestResponse;
