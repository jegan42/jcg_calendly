// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

interface Event {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
}

const Dashboard = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axiosInstance.get("/events"); // ← route backend
                setEvents(data);
            } catch (err) {
                console.error(
                    "Erreur lors du chargement des événements :",
                    err
                );
            }
        };

        fetchEvents();
    }, []);
    console.log("events", events);
    console.log("events.length", events.length);
    console.log("document.cookie", document.cookie);
    return (
        <div style={{ padding: "2rem" }}>
            <h2>Mon tableau de bord</h2>

            <Button onClick={() => navigate("/event/new")}>
                ➕ Créer un événement
            </Button>
            <h2>📅 Mes événements</h2>
            <h2>📅 Total events: {events.length}</h2>

            {!events.length ? (
                <p>Aucun événement trouvé.</p>
            ) : (
                <ul>
                    {events.map((event) => (
                        <li
                            key={event.id}
                            style={{ marginBottom: "1rem", cursor: "pointer" }}
                        >
                            <Button
                                onClick={() => navigate(`/event/${event.id}`)}
                            >
                                <strong>{event.title}</strong> <br />
                                {new Date(
                                    event.start_time
                                ).toLocaleString()} →{" "}
                                {new Date(event.end_time).toLocaleString()}
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
