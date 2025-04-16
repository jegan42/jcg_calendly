// src/pages/EventPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axios"; // Assure-toi que ce fichier est bien configuré

const EventPage = () => {
    const { id } = useParams<{ id: string }>(); // Récupérer l'ID depuis l'URL
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axiosInstance.get(`/events/${id}`); // Appel à l'API backend
                setEvent(response.data.event);
                setLoading(false);
            } catch (err) {
                setError("Erreur lors de la récupération de l'événement");
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>
                <strong>Start:</strong>{" "}
                {new Date(event.start_time).toLocaleString()}
            </p>
            <p>
                <strong>End:</strong>{" "}
                {new Date(event.end_time).toLocaleString()}
            </p>
            <h3>Invités:</h3>
            <ul>
                {event.guests.map((guest: string, index: number) => (
                    <li key={index}>{guest}</li>
                ))}
            </ul>
        </div>
    );
};

export default EventPage;
