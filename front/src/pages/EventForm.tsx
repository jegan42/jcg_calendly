// src/pages/EventForm.tsx
import { useForm } from "react-hook-form";
import axiosInstance from "../services/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import { getDefaultTimes } from "../utils/funtions";
import { EventFormContent } from "../components/EventFormContent";
import { EventFormData } from "../utils/types";
import { createGoogleCalendarEvent } from "../services/googleCalendar";

const EventForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const preselectedDate = queryParams.get("date");
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { defaultStart, defaultEnd } = getDefaultTimes(preselectedDate ?? "");

    const form = useForm<EventFormData>({
        defaultValues: {
            start_time: defaultStart,
            end_time: defaultEnd,
        },
    });

    const onSubmit = async (data: EventFormData) => {
        const start = new Date(data.start_time);
        const end = new Date(data.end_time);

        if (start >= end) {
            setSubmitError(
                "❌ La date de fin doit être après la date de début."
            );
            return;
        }

        const payload = {
            ...data,
            guests: data.guests
                .split(",")
                .map((email) => email.trim())
                .filter((email) => email.length > 0),
        };

        try {
            await axiosInstance.post("/events", payload);
            if (data.syncGoogle) {
                await createGoogleCalendarEvent({
                    ...payload,
                    description: payload.description ?? "", // Ensure description is a string
                    guests: data.guests
                        .split(",")
                        .map((email) => email.trim())
                        .filter(Boolean),
                    timeZone: "Europe/Paris",
                });
            }
            navigate("/dashboard"); // retour au dashboard après succès
        } catch (error) {
            if ((error as AxiosError).response?.status === 403) {
                setSubmitError("❌ Erreur CSRF : token invalide ou expiré.");
            } else {
                setSubmitError("Erreur lors de la création de l’événement.");
            }
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <EventFormContent
                form={form}
                submitError={submitError}
                onSubmit={() => form.handleSubmit(onSubmit)()}
                isSubmitting={form.formState.isSubmitting}
            />
        </div>
    );
};

export default EventForm;
