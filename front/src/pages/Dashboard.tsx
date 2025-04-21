// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "../components/Button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Event {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
}

const Dashboard = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [formattedEvents, setFormattedEvents] = useState();
    const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

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
            <h1>Mon tableau de bord</h1>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <h2>📅 Mes événements</h2>
                <Button onClick={() => navigate("/event/new")}>
                    ➕ Créer un événement
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <h3>Total événements: {events.length}</h3>
                {!events.length && <p>Aucun événement trouvé.</p>}
                {!!events.length && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        <p>Mode d'affichage :</p>
                        {viewMode === "list" && (
                            <IconButton onClick={() => setViewMode("calendar")}>
                                📅
                            </IconButton>
                        )}
                        {viewMode === "calendar" && (
                            <IconButton onClick={() => setViewMode("list")}>
                                📋
                            </IconButton>
                        )}
                    </div>
                )}
            </div>
            {!!events.length && viewMode === "calendar" && (
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
                    dateClick={(info) => {
                        const date = new Date(info.dateStr).toISOString();
                        navigate(`/event/new?date=${encodeURIComponent(date)}`);
                    }}
                />
            )}
            {!!events.length && viewMode === "list" && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "1rem",
                    }}
                >
                    {events.map((event) => (
                        <Button
                            key={event.id}
                            onClick={() => navigate(`/event/${event.id}`)}
                            style={{ width: "100%" }}
                        >
                            <strong>{event.title}</strong> <br />
                            {new Date(event.start_time).toLocaleString()} →{" "}
                            {new Date(event.end_time).toLocaleString()}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
