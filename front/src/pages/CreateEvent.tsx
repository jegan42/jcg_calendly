// src/pages/CreateEvent.tsx
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { createGoogleCalendarEvent } from "../services/googleCalendar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const Container = styled.div`
    padding: 2rem;
    max-width: 600px;
    margin: auto;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Textarea = styled.textarea`
    padding: 10px;
    font-size: 16px;
`;

type EventFormValues = {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    guests: string; // une string séparée par virgule qu'on split ensuite
    timeZone: string;
};

const CreateEvent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EventFormValues>({
        defaultValues: {
            timeZone: "Europe/Paris",
        },
    });

    const onSubmit = async (data: EventFormValues) => {
        try {
            const response = await createGoogleCalendarEvent({
                ...data,
                guests: data.guests
                    .split(",")
                    .map((email) => email.trim())
                    .filter(Boolean),
            });

            console.log("✅ Event created:", response);
            alert("Événement synchronisé avec Google Calendar !");
            reset();
        } catch (error) {
            console.error("❌ Erreur création:", error);
            alert("Erreur lors de la création de l'événement.");
        }
    };

    return (
        <Container>
            <h2>Créer un événement</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 max-w-md mx-auto"
            >
                <label>
                    <span>Titre :</span>
                    <Input
                        type="text"
                        {...register("title", { required: true })}
                        className="w-full p-2 border"
                    />
                </label>
                {errors.title && (
                    <span className="text-red-500">Titre requis</span>
                )}

                <label>
                    <span>Description :</span>
                    <textarea
                        {...register("description")}
                        className="w-full p-2 border"
                    />
                </label>

                <Input
                    type="datetime-local"
                    {...register("start_time", { required: true })}
                    className="w-full p-2 border"
                />
                {errors.start_time && (
                    <span className="text-red-500">Heure de début requise</span>
                )}

                <Input
                    type="datetime-local"
                    {...register("end_time", { required: true })}
                    className="w-full p-2 border"
                />
                {errors.end_time && (
                    <span className="text-red-500">Heure de fin requise</span>
                )}

                <label>
                    <span>Emails invités (séparés par virgule)</span>
                    <Input
                        type="text"
                        {...register("guests")}
                        className="w-full p-2 border"
                    />
                </label>

                <Input
                    type="text"
                    {...register("timeZone")}
                    className="w-full p-2 border"
                />

                <Button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Créer l'événement
                </Button>
            </form>
        </Container>
    );
};

export default CreateEvent;
