// src/pages/PublicBooking.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublicEventBySlug, bookPublicSlot } from "../services/eventService";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
`;

const Description = styled.p`
    color: #555;
    margin-bottom: 1.5rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Label = styled.label`
    font-weight: 500;
    display: flex;
    flex-direction: column;
    font-size: 0.95rem;
`;

interface MessageProps {
    success: boolean;
}

const Message = styled.p<MessageProps>`
    margin-top: 1rem;
    font-weight: bold;
    color: ${(props) => (props.success ? "green" : "red")};
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9rem;
`;

const PublicBooking = () => {
    const { slug } = useParams<{ slug: string }>();
    const [event, setEvent] = useState<any>(null);
    const [form, setForm] = useState({
        start_time: "",
        end_time: "",
        email: "",
    });
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (slug) {
            getPublicEventBySlug(slug)
                .then((res) => setEvent(res?.data?.events))
                .catch(() => {
                    setMessage("Événement introuvable.");
                });
        }
    }, [slug]);

    const validateForm = () => {
        const newErrors: typeof errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.exec(form.email)) {
            newErrors.email = "Adresse email invalide.";
        }

        if (!form.start_time || !form.end_time) {
            newErrors.time = "Début et fin sont requis.";
        } else if (form.start_time >= form.end_time) {
            newErrors.time = "La date de début doit précéder la date de fin.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setMessage("❌ Adresse email invalide.");
            setSuccess(false);
            setLoading(false);
            return;
        }

        if (new Date(form.start_time) >= new Date(form.end_time)) {
            setMessage("❌ L'heure de fin doit être après l'heure de début.");
            setSuccess(false);
            setLoading(false);
            return;
        }

        if (!validateForm()) return;

        try {
            await bookPublicSlot(slug!, {
                user_id: null,
                ...form,
            });
            setSuccess(true);
            setMessage("✅ Réservation confirmée !");
        } catch (err) {
            setSuccess(false);
            setMessage("❌ Erreur lors de la réservation.");
        } finally {
            setLoading(false);
        }
    };

    if (!event)
        return (
            <Container>
                <p>Chargement de l'événement...</p>
            </Container>
        );

    return (
        <Container>
            <Title>Réserver : {event.title}</Title>
            <Description>{event.description}</Description>

            <Form onSubmit={handleBooking}>
                <Label>
                    Début :
                    <Input
                        type="datetime-local"
                        value={form.start_time}
                        onChange={(e) =>
                            setForm({ ...form, start_time: e.target.value })
                        }
                        required
                    />
                </Label>
                <Label>
                    Fin :
                    <Input
                        type="datetime-local"
                        value={form.end_time}
                        onChange={(e) =>
                            setForm({ ...form, end_time: e.target.value })
                        }
                        required
                    />
                </Label>
                {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
                <Label>
                    Votre adresse email :
                    <Input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        required
                    />
                </Label>
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

                <Button type="submit" disabled={loading}>
                    {loading ? "Réservation..." : "Réserver le créneau"}
                </Button>
            </Form>

            {message && <Message success={success}>{message}</Message>}
        </Container>
    );
};

export default PublicBooking;
