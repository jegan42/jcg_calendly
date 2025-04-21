// src/pages/EventForm.tsx
import { useForm } from "react-hook-form";
import axiosInstance from "../services/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import type { AxiosError } from "axios";

type EventFormData = {
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    guests: string;
    is_public: boolean;
    notification_enabled: boolean;
    cancellation_policy: boolean;
};

const EventForm = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const preselectedDate = queryParams.get("date");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<EventFormData>({
        defaultValues: {
            start_time: preselectedDate?.slice(0, 16) ?? "",
        },
    });
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);

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
            console.log("Données soumises :", payload);
            const retVal = await axiosInstance.post("/events", payload);
            console.log("retVal apres axios :", retVal);
            // navigate("/dashboard"); // retour au dashboard après succès
        } catch (error) {
            console.error("Erreur lors de la création :", error);
            setSubmitError("Erreur lors de la création de l’événement.");

            if ((error as AxiosError).response?.status === 403) {
                setSubmitError(
                    "❌ Erreur de sécurité : CSRF token invalide ou expiré."
                );
            } else {
                setSubmitError("Erreur lors de la création de l’événement.");
            }
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Créer un événement</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Titre :</span>
                    <Input
                        {...register("title", { required: true })}
                        id="title"
                    />
                </label>
                {errors.title && <p>Le titre est requis</p>}

                <label>
                    <span>Description :</span>
                    <textarea {...register("description")} id="description" />
                </label>

                <label>
                    <span>Date de début :</span>
                    <Input
                        type="datetime-local"
                        {...register("start_time", { required: true })}
                        value={preselectedDate?.slice(0, 16) ?? ""}
                    />
                </label>
                {errors.start_time && (
                    <ErrorMessage>
                        {errors.start_time.message}: Date de début requise
                    </ErrorMessage>
                )}

                <label>
                    <span>Date de fin :</span>
                    <Input
                        type="datetime-local"
                        {...register("end_time", { required: true })}
                    />
                </label>
                {errors.end_time && (
                    <ErrorMessage>
                        {errors.end_time.message}: Date de fin requise
                    </ErrorMessage>
                )}

                <label>
                    <span>Invités (emails séparés par des virgules) :</span>
                    <Input {...register("guests")} />
                </label>
                <label>
                    <span>Événement public</span>
                    <Input type="checkbox" {...register("is_public")} />
                </label>
                <label>
                    <span>Notification activée</span>
                    <Input
                        type="checkbox"
                        {...register("notification_enabled")}
                    />
                </label>

                <label>
                    <span>Annulation autorisée</span>
                    <Input
                        type="checkbox"
                        {...register("cancellation_policy")}
                    />
                </label>

                {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ marginTop: "1rem" }}
                >
                    {isSubmitting ? "Création..." : "Créer l'événement"}
                </Button>
            </form>
        </div>
    );
};

export default EventForm;
