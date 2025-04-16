// front/src/services/availabilityService.ts
import axios from "./axios";

export const getAvailabilities = async () => {
    const res = await axios.get("/availability");
    return res.data.availability;
};

export const addAvailability = async (data: {
    day_of_week: string;
    start_time: string;
    end_time: string;
}) => {
    const res = await axios.post("/availability", data);
    return res.data.availability;
};

export const updateAvailability = async (
    id: string,
    data: { day_of_week: string; start_time: string; end_time: string }
) => {
    const res = await axios.put(`/availability/${id}`, data);
    return res.data.updated;
};

export const deleteAvailability = async (id: string) => {
    const res = await axios.delete(`/availability/${id}`);
    return res.data.deleted;
};
