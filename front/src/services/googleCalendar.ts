// src/services/googleCalendar.ts
import axiosInstance from "./axios";

export const createGoogleCalendarEvent = async (eventDetails: {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    guests: string[];
    timeZone: string;
}) => {
    try {
        const res = await axiosInstance.post(
            "/events/google-calendar",
            eventDetails,
            {
                withCredentials: true, // 👈 Inclut les cookies (JWT)
            }
        );

        return res.data;
    } catch (error: any) {
        const message =
            error.response?.data?.message ||
            "Erreur lors de la création de l'événement";
        throw new Error(message);
    }
};
