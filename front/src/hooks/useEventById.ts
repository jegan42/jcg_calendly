// src/hooks/useEventById.ts
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "../services/eventService";

export const useEventById = (id: string | undefined) => {
    return useQuery({
        queryKey: ["event", id],
        queryFn: () => getEventById(id!),
        enabled: !!id, // pour éviter que ça run avant que id soit dispo
    });
};
