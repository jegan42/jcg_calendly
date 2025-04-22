// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "../components/Button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    source: "local" | "google";
}

type ViewFilter = "all" | "local" | "google";

const Dashboard = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [formattedEvents, setFormattedEvents] = useState<CalendarEvent[]>();
    const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
    const [filter, setFilter] = useState<ViewFilter>("all");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const [localRes, googleRes] = await Promise.all([
                    axiosInstance.get("/events"),
                    axiosInstance.get("/events/google-calendar"),
                ]);

                const localEvents: CalendarEvent[] = localRes.data.events.map(
                    (e: any) => ({
                        id: `local-${e.id}`,
                        title: e.title,
                        start: e.start_time,
                        end: e.end_time,
                        source: "local",
                    })
                );

                const googleEvents: CalendarEvent[] = googleRes.data.events.map(
                    (e: any) => ({
                        id: e.id,
                        title: e.summary,
                        start: e.start?.dateTime || e.start?.date,
                        end: e.end?.dateTime || e.end?.date,
                        source: "google",
                    })
                );

                const allEvents = [...localEvents, ...googleEvents];
                setEvents(allEvents);
                setFormattedEvents(allEvents); // default to all
            } catch (err) {
                console.error("❌ Erreur chargement événements :", err);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        if (filter === "all") setFormattedEvents(events);
        else setFormattedEvents(events.filter((e) => e.source === filter));
    }, [filter, events]);

    console.log("events", events);
    console.log("events.length", events.length);
    console.log("document.cookie", document.cookie);

    console.log("🔍🔍🔍 events.keys", events.keys);
    return (
        <div style={{ padding: "2rem" }}>
            <h1 style={{ textAlign: "center" }}>Mon tableau de bord</h1>

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
                    <label style={{ marginBottom: "1rem" }}>
                        <span>Filtrer : </span>
                        <select
                            value={filter}
                            onChange={(e) =>
                                setFilter(e.target.value as ViewFilter)
                            }
                            style={{ marginLeft: "0.5rem", padding: "0.5rem" }}
                        >
                            <option value="all">🪄 Tous</option>
                            <option value="local">🗂️ Locaux</option>
                            <option value="google">📘 Google</option>
                        </select>
                    </label>
                )}

                {!!events.length && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                    events={formattedEvents}
                    headerToolbar={{
                        start: "prev,next today",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    eventClick={(info) => {
                        if (info.event.id.startsWith("local-")) {
                            navigate(
                                `/event/${info.event.id.replace("local-", "")}`
                            );
                        } else {
                            window.open(
                                `https://calendar.google.com/calendar/u/0/r/eventedit/${info.event.id}`,
                                "_blank"
                            );
                        }
                    }}
                    eventContent={(arg) => {
                        const source = arg.event.extendedProps.source;
                        const badge = source === "google" ? "📘" : "🗂️";
                        return (
                            <div>
                                <strong>
                                    {badge} {arg.event.title}
                                </strong>
                            </div>
                        );
                    }}
                    dateClick={(info) => {
                        const date = new Date(info.dateStr).toISOString();
                        navigate(`/event/new?date=${encodeURIComponent(date)}`);
                    }}
                    height="auto"
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
                            onClick={() =>
                                event.source === "local"
                                    ? navigate(
                                          `/event/${event.id.replace(
                                              "local-",
                                              ""
                                          )}`
                                      )
                                    : window.open(
                                          `https://calendar.google.com/calendar/u/0/r/eventedit/${event.id}`,
                                          "_blank"
                                      )
                            }
                            style={{ width: "100%" }}
                        >
                            <strong>
                                {event.source === "google" ? "📘" : "🗂️"}{" "}
                                {event.title}
                            </strong>{" "}
                            <br />
                            {new Date(event.start).toLocaleString()} →{" "}
                            {new Date(event.end).toLocaleString()}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
