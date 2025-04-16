// src/services/eventService.ts
import axiosInstance from "./axios";

export const getUserEvents = async () => {
    const { data } = await axiosInstance.get("/events");
    return data;
};

export const getEventById = async (id: string) => {
    const { data } = await axiosInstance.get(`/events/${id}`);
    return data;
};

export const saveEventWithGoogleRequestId = async (
    eventDetails: any,
    googleRequestId: string
) => {
    try {
        // Appel à l'API backend pour sauvegarder l'événement dans Supabase
        const response = await axiosInstance.post("/events", {
            eventDetails,
            googleRequestId,
        });

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'événement:", error);
        throw error;
    }
};

export const getPublicEventBySlug = async (slug: string) => {
    return axiosInstance.get(`/public/book/${slug}`);
};

export const bookPublicSlot = async (slug: string, payload: any) => {
    return axiosInstance.post(`/public/book/${slug}`, payload);
};
