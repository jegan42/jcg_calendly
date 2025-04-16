// src/services/recurringService.ts
import api from "./axios";

export const getRecurringEvents = async () => {
    const res = await api.get("/recurring");
    return res.data.events;
};

export const createRecurringEvent = async (data: any) => {
    const res = await api.post("/recurring", data);
    return res.data;
};

export const deleteRecurringEvent = async (id: string) => {
    const res = await api.delete(`/recurring/${id}`);
    return res.data;
};

export const generateRecurringInstances = async (id: string) => {
    const res = await api.post(`/recurring/generate/${id}`);
    return res.data;
};
