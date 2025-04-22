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
    backgroundColor: string; // bleu clair
    textColor: string;
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
                        backgroundColor: "#d4f5d4", // vert clair
                        textColor: "#1a7f37", // vert foncé
                    })
                );

                const googleEvents: CalendarEvent[] = googleRes.data.events.map(
                    (e: any) => ({
                        id: e.id,
                        title: e.summary,
                        start: e.start?.dateTime || e.start?.date,
                        end: e.end?.dateTime || e.end?.date,
                        source: "google",
                        backgroundColor: "#d0e6ff", // bleu clair
                        textColor: "#1a73e8", // bleu foncé
                    })
                );
                // 🔍 Filtrer les doublons : si un Google event a le même titre et horaires, on ignore le local
                const isDuplicate = (
                    local: CalendarEvent,
                    google: CalendarEvent
                ) => {
                    return (
                        local.title === google.title &&
                        new Date(local.start).getTime() ===
                            new Date(google.start).getTime() &&
                        new Date(local.end).getTime() ===
                            new Date(google.end).getTime()
                    );
                };

                const filteredLocalEvents = localEvents.filter(
                    (local) =>
                        !googleEvents.some((google) =>
                            isDuplicate(local, google)
                        )
                );

                const allEvents = [...filteredLocalEvents, ...googleEvents].sort(
                    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
                );
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
                    <label>
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
                    // eventContent={(arg) => {
                    //     const source = arg.event.extendedProps.source;
                    //     const badge = source === "google" ? "📘" : "🗂️";
                    //     return (
                    //         <div>
                    //             <strong>
                    //                 {badge} {arg.event.title}
                    //             </strong>
                    //         </div>
                    //     );
                    // }}
                    eventDidMount={(info) => {
                        const source = info.event.extendedProps.source;
                        const el = info.el;
                        if (source === "google") {
                            el.style.backgroundColor = "#d0e6ff";
                            el.style.color = "#1a73e8";
                        } else {
                            el.style.backgroundColor = "#d4f5d4";
                            el.style.color = "#1a7f37";
                        }
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
                            style={{
                                backgroundColor:
                                    event.source === "google"
                                        ? "#d0e6ff"
                                        : "#d4f5d4",
                                color:
                                    event.source === "google"
                                        ? "#1a73e8"
                                        : "#1a7f37",
                                padding: "2px 6px",
                                borderRadius: "6px",
                                fontSize: "0.8rem",
                                width: "100%",
                            }}
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
