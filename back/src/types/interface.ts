// src/types/interface.ts
export interface User {
    id: string; // Add the 'id' property to the User type
    id_google: string;
    email: string; // Add the email property to the User type
    name: string;
    avatar: string;
    token: string; // Add the token property to the User type
    accessToken: string; // Add the accessToken property to the User type
}

export interface EventType {
    id: number; // Unique identifier of the event
    user_id: string; // ID of the user who owns the event
    title: string; // Title of the event
    description: string; // Description of the event
    start_time: Date; // Start time of the event
    end_time: Date; // End time of the event
    is_public: boolean; // Indicates whether the event is public or private
    notification_enabled: boolean; // Indicates whether notifications are enabled for the event
    cancellation_policy: boolean; // Indicates whether the event has a cancellation policy
    guests: string[]; // List of emails or IDs of participants
}
