// src/hooks/useEventById.ts
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "../services/eventService";

export const useEventById = (id: string | undefined) => {
    return useQuery({
        queryKey: ["event", id],
        queryFn: () => getEventById(id!),
        enabled: !!id, // to prevent it from running before the id is available
    });
};
