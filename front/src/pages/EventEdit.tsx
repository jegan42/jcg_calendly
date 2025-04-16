// src/pages/EventEdit.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import GuestList from "../components/GuestList";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

interface FormData {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    guests: string;
    is_public: boolean;
    notification_enabled: boolean;
    cancellation_policy: boolean;
}

const EventEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await axiosInstance.get(`/events/${id}`);
                reset({
                    title: data.title,
                    description: data.description,
                    start_time: data.start_time.slice(0, 16),
                    end_time: data.end_time.slice(0, 16),
                    guests: data.guests?.join(", ") || "",
                    is_public: data.is_public,
                    notification_enabled: data.notification_enabled,
                    cancellation_policy: data.cancellation_policy,
                });
            } catch (err) {
                console.error("Erreur de récupération :", err);
            }
        };

        fetchEvent();
    }, [id, reset]);

    const onSubmit = async (formData: FormData) => {
        try {
            await axiosInstance.put(`/event/${id}`, {
                ...formData,
                guests: formData.guests
                    .split(",")
                    .map((email) => email.trim())
                    .filter((email) => email !== ""),
            });

            navigate(`/event/${id}`);
        } catch (err) {
            console.error("Erreur de mise à jour :", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Modifier l'événement</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Titre :</span>
                    <Input {...register("title", { required: true })} />
                </label>
                {errors.title && <p>Le titre est requis</p>}

                <label>
                    <span>Description :</span>
                    <textarea {...register("description")} />
                </label>

                <Input type="datetime-local" {...register("start_time")} />
                <Input type="datetime-local" {...register("end_time")} />

                <label>
                    <span>Emails des invités (séparés par des virgules) :</span>
                    <textarea {...register("guests")} />
                </label>

                <label>
                    <Input type="checkbox" {...register("is_public")} />
                    <p>Événement public</p>
                </label>
                <label>
                    <Input
                        type="checkbox"
                        {...register("notification_enabled")}
                    />
                    <p>Notifications activées</p>
                </label>
                <label>
                    <Input
                        type="checkbox"
                        {...register("cancellation_policy")}
                    />
                    <p>Politique d’annulation activée</p>
                </label>

                <Button type="submit">💾 Enregistrer</Button>
            </form>
            <GuestList guests={[]} onStatusChange={() => {}} />
        </div>
    );
};

export default EventEdit;
