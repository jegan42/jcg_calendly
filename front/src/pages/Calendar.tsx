// src/pages/Calendar.tsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

interface Event {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
}

const Calendar = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newEventData, setNewEventData] = useState({
        title: "",
        start_time: "",
        end_time: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axiosInstance.get("/events");
                const formatted = data.map((e: Event) => ({
                    id: e.id,
                    title: e.title,
                    start: e.start_time,
                    end: e.end_time,
                }));
                setEvents(formatted);
            } catch (err) {
                console.error("Erreur de chargement du calendrier :", err);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (clickInfo: any) => {
        const eventId = clickInfo.event.id;
        navigate(`/event/${eventId}`);
    };

    const handleDateClick = (clickInfo: any) => {
        const { dateStr } = clickInfo;
        setNewEventData({
            ...newEventData,
            start_time: dateStr,
            end_time: dateStr, // Default to the same date
        });
        setShowModal(true);
    };

    const handleSubmit = async () => {
        const payload = {
            ...newEventData,
            guests: [], // Assuming no guests for this quick creation
            is_public: false,
            notification_enabled: false,
            cancellation_policy: false,
        };

        try {
            await axiosInstance.post("/event", payload);
            setShowModal(false);
            navigate("/dashboard"); // Redirige après création réussie
        } catch (err) {
            console.error("Erreur lors de la création de l'événement :", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>📆 Calendrier</h2>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                eventClick={handleEventClick}
                dateClick={handleDateClick} // Ajouter le clic sur une date pour créer un événement
                height="auto"
            />

            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: "20%",
                        left: "30%",
                        backgroundColor: "white",
                        padding: "1rem",
                        zIndex: 1000,
                    }}
                >
                    <h3>Créer un événement</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label>
                            <span>Titre de l'événement :</span>
                            <Input
                                type="text"
                                value={newEventData.title}
                                onChange={(e) =>
                                    setNewEventData({
                                        ...newEventData,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <Input
                            type="datetime-local"
                            value={newEventData.start_time}
                            onChange={(e) =>
                                setNewEventData({
                                    ...newEventData,
                                    start_time: e.target.value,
                                })
                            }
                        />
                        <br />
                        <Input
                            type="datetime-local"
                            value={newEventData.end_time}
                            onChange={(e) =>
                                setNewEventData({
                                    ...newEventData,
                                    end_time: e.target.value,
                                })
                            }
                        />
                        <br />
                        <Button type="button" onClick={handleSubmit}>
                            Créer l'événement
                        </Button>
                        <Button
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Annuler
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Calendar;
