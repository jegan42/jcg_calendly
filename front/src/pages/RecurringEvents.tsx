import React, { useEffect, useState } from "react";
import {
    getRecurringEvents,
    createRecurringEvent,
    deleteRecurringEvent,
    generateRecurringInstances,
} from "../services/recurringService";
import styled from "styled-components";
import { Button, DeleteButton } from "../components/Button";
import { Input } from "../components/Input";

const Container = styled.div`
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
`;

const Title = styled.h2`
    margin-bottom: 1rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-top: 2rem;
`;

const Select = styled.select`
    ${Input}
`;

const Message = styled.p<{ success?: boolean }>`
    color: ${({ success }) => (success ? "green" : "red")};
    font-weight: bold;
    margin: 1rem 0;
`;

const EventItem = styled.li`
    margin-bottom: 1.5rem;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 6px;
    background-color: #fafafa;
`;

interface RecurringEvent {
    id: string;
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    frequency: "daily" | "weekly" | "monthly";
    interval: number;
}

const RecurringEvents = () => {
    const [recurrents, setRecurrents] = useState<RecurringEvent[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        frequency: "daily",
        interval: 1,
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchRecurring = async () => {
        try {
            const data = await getRecurringEvents();
            setRecurrents(data);
        } catch {
            setMessage("Erreur lors du chargement.");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "interval" ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (!formData.title || !formData.start_time || !formData.end_time) {
            setMessage("❌ Veuillez remplir tous les champs obligatoires.");
            return;
        }

        if (formData.start_time >= formData.end_time) {
            setMessage("❌ La date de début doit être avant la date de fin.");
            return;
        }

        setLoading(true);

        try {
            await createRecurringEvent(formData);
            setFormData({
                title: "",
                description: "",
                start_time: "",
                end_time: "",
                frequency: "daily",
                interval: 1,
            });
            await fetchRecurring();
            setMessage("✅ Événement ajouté.");
        } catch {
            setMessage("❌ Erreur lors de l’ajout.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Supprimer cet événement ?")) return;
        try {
            await deleteRecurringEvent(id);
            await fetchRecurring();
            setMessage("🗑 Supprimé !");
        } catch {
            setMessage("❌ Erreur de suppression.");
        }
    };

    const handleGenerate = async (id: string) => {
        try {
            await generateRecurringInstances(id);
            setMessage("📅 Occurrences générées !");
        } catch {
            setMessage("❌ Échec de la génération.");
        }
    };

    useEffect(() => {
        fetchRecurring();
    }, []);

    return (
        <Container>
            <Title>📆 Événements récurrents</Title>

            {message && (
                <Message
                    success={
                        message.startsWith("✅") || message.startsWith("📅")
                    }
                >
                    {message}
                </Message>
            )}

            <ul>
                {recurrents.map((event) => (
                    <EventItem key={event.id}>
                        <strong>{event.title}</strong> – {event.frequency} /{" "}
                        {event.interval}
                        <br />⏰ {event.start_time} → {event.end_time}
                        <br />
                        <DeleteButton onClick={() => handleDelete(event.id)}>
                            ❌ Supprimer
                        </DeleteButton>{" "}
                        <Button onClick={() => handleGenerate(event.id)}>
                            📅 Générer les occurrences
                        </Button>
                    </EventItem>
                ))}
            </ul>

            <h3>➕ Créer un événement récurrent</h3>
            <Form onSubmit={handleSubmit}>
                <label>
                    <span>Titre :</span>
                    <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    <span>Description :</span>
                    <Input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <Input
                    type="datetime-local"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="datetime-local"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                />
                <Select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                >
                    <option value="daily">Quotidien</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuel</option>
                </Select>
                <Input
                    type="number"
                    name="interval"
                    value={formData.interval}
                    onChange={handleChange}
                    min={1}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Création..." : "Créer"}
                </Button>
            </Form>
        </Container>
    );
};

export default RecurringEvents;
