// src/types/types.ts

export type EventFormData = {
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    guests: string;
    is_public: boolean;
    notification_enabled: boolean;
    cancellation_policy: boolean;
};
