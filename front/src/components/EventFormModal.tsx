// src/components/EventFormModal.tsx
import { useForm } from "react-hook-form";
import axiosInstance from "../services/axios";
import { Modal } from "./Modal";
import { EventFormContent } from "./EventFormContent";
import { AxiosError } from "axios";
import { useState } from "react";
import { EventFormData } from "../utils/types";
import { getDefaultTimes } from "../utils/funtions";

export const EventFormModal = ({
    onClose,
    initDate,
    onSuccess,
}: {
    onClose: () => void;
    initDate: string;
    onSuccess?: () => void;
}) => {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { defaultStart, defaultEnd } = getDefaultTimes(initDate);

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
            onSuccess?.();
            onClose();
        } catch (error) {
            if ((error as AxiosError).response?.status === 403) {
                setSubmitError("❌ Erreur CSRF : token invalide ou expiré.");
            } else {
                setSubmitError("Erreur lors de la création de l’événement.");
            }
        }
    };

    return (
        <Modal>
            <EventFormContent
                form={form}
                submitError={submitError}
                onSubmit={() => form.handleSubmit(onSubmit)()}
                onClose={onClose}
                isSubmitting={form.formState.isSubmitting}
            />
        </Modal>
    );
};
