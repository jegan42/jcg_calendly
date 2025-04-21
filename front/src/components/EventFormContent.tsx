// src/components/EventFormContent.tsx
import { Input } from "./Input";
import ErrorMessage from "./ErrorMessage";
import { ModalButton, ModalForm, ModalLabelCol, ModalLabelLin } from "./Modal";
import { UseFormReturn } from "react-hook-form";
import { EventFormData } from "../types/types";

type Props = {
    form: UseFormReturn<EventFormData>;
    submitError: string | null;
    onClose?: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
};

export const EventFormContent = ({
    form,
    submitError,
    onClose,
    onSubmit,
    isSubmitting,
}: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Créer un événement</h2>
            <ModalForm
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
                {errors.start_time && (
                    <ErrorMessage>
                        {errors.start_time.message}: Date de début requise
                    </ErrorMessage>
                )}

                <ModalLabelLin>
                    <span>Date de fin :</span>
                    <Input
                        type="datetime-local"
                        {...register("end_time", { required: true })}
                    />
                </ModalLabelLin>
                {errors.end_time && (
                    <ErrorMessage>
                        {errors.end_time.message}: Date de fin requise
                    </ErrorMessage>
                )}

                <ModalLabelCol>
                    <span>Invités :</span>
                    <Input
                        {...register("guests")}
                        placeholder="mail1@mail.com, mail2@mail.com"
                    />
                </ModalLabelCol>

                <ModalLabelLin>
                    <span>Événement public :</span>
                    <Input type="checkbox" {...register("is_public")} />
                </ModalLabelLin>

                <ModalLabelLin>
                    <span>Notifications :</span>
                    <Input
                        type="checkbox"
                        {...register("notification_enabled")}
                    />
                </ModalLabelLin>

                <ModalLabelLin>
                    <span>Annulation autorisée :</span>
                    <Input
                        type="checkbox"
                        {...register("cancellation_policy")}
                    />
                </ModalLabelLin>

                {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

                <ModalLabelLin>
                    <ModalButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Création..." : "Créer l'événement"}
                    </ModalButton>
                    {onClose && (
                        <ModalButton onClick={onClose} type="button">
                            Annuler
                        </ModalButton>
                    )}
                </ModalLabelLin>
            </ModalForm>
        </div>
    );
};
