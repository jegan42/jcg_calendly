// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

interface Event {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
}

const Dashboard = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [formattedEvents, setFormattedEvents] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axiosInstance.get("/events"); // ← route backend
                setEvents(data.events);
                setFormattedEvents(
                    data.events.map((event: Event) => ({
                        id: event.id,
                        title: event.title,
                        start: event.start_time,
                        end: event.end_time,
                    }))
                );
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

    console.log("🔍🔍🔍 events.keys", events.keys);
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
                <>
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            start: "prev,next today",
                            center: "title",
                            end: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        events={formattedEvents}
                        height="auto"
                        eventClick={(info) => {
                            navigate(`/event/${info.event.id}`);
                        }}
                    />

                    <ul>
                        {events.map((event) => (
                            <li
                                key={event.id}
                                style={{
                                    marginBottom: "1rem",
                                    cursor: "pointer",
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        navigate(`/event/${event.id}`)
                                    }
                                >
                                    <strong>{event.title}</strong> <br />
                                    {new Date(
                                        event.start_time
                                    ).toLocaleString()}{" "}
                                    →{" "}
                                    {new Date(event.end_time).toLocaleString()}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Dashboard;
