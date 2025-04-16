// src/hooks/useEvents.ts
import { useQuery } from "@tanstack/react-query";
import { getUserEvents } from "../services/eventService";

const {
    data: events,
    isLoading,
    error,
} = useQuery({
    queryKey: ["events"],
    queryFn: getUserEvents,
});
