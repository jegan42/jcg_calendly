// src/components/EventFormModal.tsx
import { useForm } from "react-hook-form";
import axiosInstance from "../services/axios";
import { Button } from "./Button";
import { Input } from "./Input";
import ErrorMessage from "./ErrorMessage";
import type { AxiosError } from "axios";
import { Modal, ModalButton, ModalLabelCol, ModalLabelLin } from "./Modal";

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

export const EventFormModal = ({
    onClose,
    defaultDate,
    onSuccess,
}: {
    onClose: () => void;
    defaultDate: string;
    onSuccess?: () => void;
}) => {
    const defaultStart = new Date(defaultDate).toISOString().slice(0, 16);
    const defaultEnd = new Date(
        new Date(defaultDate).getTime() + 60 * 60 * 1000
    )
        .toISOString()
        .slice(0, 16);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EventFormData>({
        defaultValues: {
            start_time: defaultStart,
            end_time: defaultEnd,
        },
    });

    const onSubmit = async (data: EventFormData) => {
        const start = new Date(data.start_time);
        const end = new Date(data.end_time);

        if (start >= end) {
            alert("La date de fin doit être après la date de début.");
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
                alert("CSRF token invalide ou expiré.");
            } else {
                alert("Erreur lors de la création de l’événement.");
            }
        }
    };

    return (
        <Modal>
            <h3>Créer un événement</h3>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: "flex", flexDirection: "column" }}
            >
                <ModalLabelLin>
                    <span>Titre :</span>
                    <Input {...register("title", { required: true })} />
                </ModalLabelLin>
                {errors.title && (
                    <ErrorMessage>Le titre est requis</ErrorMessage>
                )}

                <ModalLabelCol>
                    <span>Description :</span>
                    <textarea {...register("description")} />
                </ModalLabelCol>

                <ModalLabelLin>
                    <span>Date de début :</span>
                    <Input
                        type="datetime-local"
                        {...register("start_time", { required: true })}
                    />
                </ModalLabelLin>

                <ModalLabelLin>
                    <span>Date de fin :</span>
                    <Input
                        type="datetime-local"
                        {...register("end_time", { required: true })}
                    />
                </ModalLabelLin>

                <ModalLabelCol>
                    <span>Invités :</span>
                    <Input
                        {...register("guests")}
                        placeholder="mail1@mail.com, mail2@mail.com"
                    />
                </ModalLabelCol>

                <ModalLabelLin>
                    <Input type="checkbox" {...register("is_public")} />
                    <span>Événement public</span>
                </ModalLabelLin>

                <ModalLabelLin>
                    <Input
                        type="checkbox"
                        {...register("notification_enabled")}
                    />
                    <span>Notifications</span>
                </ModalLabelLin>

                <ModalLabelLin>
                    <Input
                        type="checkbox"
                        {...register("cancellation_policy")}
                    />
                    <span>Annulation autorisée</span>
                </ModalLabelLin>

                <ModalLabelLin>
                    <ModalButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Création..." : "Créer l'événement"}
                    </ModalButton>
                    <ModalButton onClick={onClose} type="button">
                        Annuler
                    </ModalButton>
                </ModalLabelLin>
            </form>
        </Modal>
    );
};
