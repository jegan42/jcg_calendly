// src/types/interface.ts
export interface User {
    id: string; // Add the 'id' property to the User type
    id_google: string;
    email: string; // Add the email property to the User type
    name: string;
    avatar: string;
    token: string; // Add the token property to the User type
    accessToken: string; // Add the accessToken property to the User type
    created_at: Date;
    updated_at: Date;
}

export interface EventType {
    id: string; // Unique identifier of the event
    user_id: string; // ID of the user who owns the event
    title: string; // Title of the event
    description: string; // Description of the event
    slug: string;
    start_time: Date; // Start time of the event
    end_time: Date; // End time of the event
    is_public: boolean; // Indicates whether the event is public or private
    notification_enabled: boolean; // Indicates whether notifications are enabled for the event
    cancellation_policy: boolean; // Indicates whether the event has a cancellation policy
    guests: string[]; // List of emails or IDs of participants
    created_at: Date;
    updated_at: Date;
    status: "pending" | "confirmed" | "cancelled"; // status of the event
    recurrence_type?: "daily" | "weekly" | "monthly"; // reccurrence type (optional)
    recurrence_interval?: number; // recurrence interval (optional)
    google_request_id?: string; // Google Calendar request ID (optional)
}

export interface Availability {
    id: string; // Unique identifier of the availability
    user_id: string; // ID of the user
    day_of_week: string; // Day of the week (e.g., "Monday")
    start_time: string; // Start time of the availability
    end_time: string; // End time of the availability
    created_at: Date; // Creation date of the availability
    updated_at: Date; // Last update date of the availability
}

export interface RecurringEvent {
    id: string; // Unique identifier of the recurring event
    user_id: string; // ID of the user
    title: string; // Title of the event
    description: string; // Description of the event
    start_time: Date; // Start time of the recurring event
    end_time: Date; // End time of the recurring event
    frequency: "daily" | "weekly" | "monthly"; // Frequency of the recurring event
    interval: number; // Recurrence interval (e.g., every 2 days, 3 weeks, etc.)
    created_at: Date; // Creation date of the recurring event
    updated_at: Date; // Last update date of the recurring event
    guests: string[]; // List of emails or IDs of participants
}

export interface EventGuest {
    id: string; // Unique identifier of the guest
    event_id: string; // ID of the event the guest is attending
    guest_email: string; // Email of the guest
    status: "pending" | "confirmed" | "cancelled"; // Status of the invitation
    created_at: Date; // Creation date of the invitation
    updated_at: Date; // Last update date of the invitation
}

export interface EventBookings {
    id: string; // Unique identifier of the event_booking
    event_id: string; // ID of the event
    user_id: string; // ID of the user who booked the event
    guest_name: string; // Name of the guest
    guest_email: string; // Email of the guest
    start_time: Date; // Start time of the booking
    end_time: Date; // End time of the booking
    message: string; // Message from the guest
    status: "booked" | "cancelled"; // Status of the booking
    created_at: Date; // Creation date of the booking
    updated_at: Date; // Last update date of the booking
}
