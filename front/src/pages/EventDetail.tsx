// src/pages/EventDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import { useEventById } from "../hooks/useEventById";
import axios from "axios";
import { useToastContext } from "../context/ToastContext";
import GuestList from "../components/GuestList";
import { Button } from "../components/Button";

interface Event {
    id: string; // Unique identifier of the event
    user_id: string; // ID of the user who owns the event
    title: string; // Title of the event
    description: string; // Description of the event
    slug: string;
    start_time: Date; // Start time of the event
    end_time: Date; // End time of the event
    is_public: boolean; // Indicates whether the event is public or private
    notification_enabled: boolean; // Indicates whether notifications are enabled for the event
    cancellation_policy: boolean; // Indicates whether the event has a cancellation policy
    guests: string[]; // List of emails or IDs of participants
    created_at: Date;
    updated_at: Date;
    status: "pending" | "confirmed" | "cancelled"; // status of the event
    recurrence_type?: "daily" | "weekly" | "monthly"; // reccurrence type (optional)
    recurrence_interval?: number; // recurrence interval (optional)
    google_request_id?: string; // Google Calendar request ID (optional)
}

interface EventGuest {
    id: string; // Unique identifier of the guest
    event_id: string; // ID of the event the guest is attending
    guest_email: string; // Email of the guest
    status: "pending" | "confirmed" | "cancelled"; // Status of the invitation
    created_at: Date; // Creation date of the invitation
    updated_at: Date; // Last update date of the invitation
}

const EventDetail = () => {
    const { showSuccess, showError } = useToastContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: event, isLoading, error } = useEventById(id);

    const handleDelete = async () => {
        const confirm = window.confirm(
            "❗Êtes-vous sûr de vouloir supprimer cet événement ?"
        );
        if (!confirm) return;

        try {
            await axiosInstance.delete(`/events/${id}`);
            showSuccess("✅ Événement supprimé avec succès !");
            navigate("/dashboard");
        } catch (err) {
            showError("❌ Une erreur est survenue lors de la suppression.");
            console.error("Erreur de suppression :", err);
        }
    };

    // Gérer le changement de statut des invités
    const handleGuestStatusChange = async (
        guestId: string,
        status: "accepted" | "declined" | "pending"
    ) => {
        try {
            const response = await axiosInstance.put(
                `/events/${id}/guests/${guestId}`,
                { status }
            );

            if (response.data.success) {
                showSuccess("✅ Statut mis à jour !");
            } else {
                showError("❌ Erreur lors de la mise à jour du statut.");
            }
        } catch (err) {
            console.error("Erreur de mise à jour du statut :", err);
            showError("❌ Une erreur est survenue.");
        }
    };

    if (isLoading) return <p>Chargement de l’événement...</p>;
    if (error) {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
            navigate("/unauthorized");
            return null;
        }

        return <p>Erreur de chargement de l’événement.</p>;
    }

    if (!event) return <p>Événement introuvable.</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>
                <strong>Début :</strong>{" "}
                {new Date(event.start_time).toLocaleString()}
            </p>
            <p>
                <strong>Fin :</strong>{" "}
                {new Date(event.end_time).toLocaleString()}
            </p>
            <p>
                <strong>Visibilité :</strong>{" "}
                {event.is_public ? "Public" : "Privé"}
            </p>
            <p>
                <strong>Notifications :</strong>{" "}
                {event.notification_enabled ? "Oui" : "Non"}
            </p>
            <p>
                <strong>Annulation :</strong>{" "}
                {event.cancellation_policy ? "Autorisé" : "Non autorisé"}
            </p>
            <GuestList
                guests={event.guests}
                onStatusChange={handleGuestStatusChange}
            />
            <div style={{ marginTop: "2rem" }}>
                <Button onClick={() => navigate(`/events/edit/${event.id}`)}>
                    ✏️ Modifier
                </Button>

                <Button onClick={handleDelete}>🗑 Supprimer</Button>
            </div>
        </div>
    );
};

export default EventDetail;
