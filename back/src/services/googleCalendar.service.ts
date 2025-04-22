import { google } from "googleapis";

// Function to create an event
export const createEventInGoogleCalendar = async (
    accessToken: string,
    eventDetails: any
) => {
    try {
        // Create an OAuth2 client with the user's accessToken
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            access_token: accessToken,
        });

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const response = await calendar.events.insert({
            calendarId: "primary",
            requestBody: {
                summary: eventDetails.title,
                description: eventDetails.description,
                start: {
                    dateTime: eventDetails.start_time,
                    timeZone: eventDetails.timeZone,
                },
                end: {
                    dateTime: eventDetails.end_time,
                    timeZone: eventDetails.timeZone,
                },
                attendees: eventDetails.guests.map((email: string) => ({
                    email,
                })),
                reminders: {
                    useDefault: true,
                },
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating Google Calendar event:", error);
        throw new Error("Error creating Google Calendar event");
    }
};

// Function to get events
export const getEventsFromGoogleCalendar = async (accessToken: string) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const response = await calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(), // only upcoming events
        maxResults: 100,
        singleEvents: true,
        orderBy: "startTime",
    });

    return response.data.items || [];
};
