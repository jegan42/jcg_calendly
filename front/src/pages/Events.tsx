// src/pages/Events.tsx
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const Container = styled.div`
    padding: 2rem;
`;

const EventCard = styled.div`
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const Events = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axiosInstance.get("/events");
                setEvents(data.events);
            } catch (err) {
                console.error("Erreur lors du chargement des événements", err);
            }
        };

        fetchEvents();
    }, []);

    return (
        <Container>
            <Link to="/events/create">
                <Button>Créer un nouvel événement</Button>
            </Link>
            <h2>Mes événements</h2>
            {events.length === 0 ? (
                <p>Aucun événement pour le moment.</p>
            ) : (
                events.map((event) => (
                    <EventCard key={event.id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>
                            <strong>Durée :</strong> {event.duration} min
                        </p>
                    </EventCard>
                ))
            )}
        </Container>
    );
};

export default Events;
