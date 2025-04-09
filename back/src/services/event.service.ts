// src/services/event.service.ts
import { supabase } from "../lib/supabaseClient";
import { sendEmail } from "../mailer/mailer";
import { User } from "../types/interface";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validation for event creation
export const validateEvent: Array<
    (req: Request, res: Response, next: NextFunction) => void
> = [
    body("title")
        .isString()
        .withMessage("The title must be a string.")
        .isLength({ min: 3, max: 100 })
        .withMessage("The title must be between 3 and 100 characters."),
    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("The description cannot exceed 500 characters."),
    body("start_time")
        .isISO8601()
        .withMessage("The start time must be a valid ISO date.")
        .custom((start_time) => {
            if (new Date(start_time) < new Date()) {
                throw new Error("The event cannot start in the past.");
            }
            return true;
        }),
    body("end_time")
        .isISO8601()
        .withMessage("The end time must be a valid ISO date.")
        .custom((end_time, { req }) => {
            if (new Date(end_time) <= new Date(req.body.start_time)) {
                throw new Error("The end time must be after the start time.");
            }
            return true;
        }),
    body("guests")
        .isArray()
        .withMessage("Guests must be an array of emails.")
        .custom((guests) => {
            if (guests.length > 100) {
                throw new Error("The maximum number of guests is 100.");
            }
            const emailsSet = new Set(guests);
            if (emailsSet.size !== guests.length) {
                throw new Error("Duplicate guests are present.");
            }
            return true;
        }),
    body("guests.*").isEmail().withMessage("Each guest must be a valid email."),
    body("is_public")
        .isBoolean()
        .withMessage("The event visibility must be a boolean."),
    body("notification_enabled")
        .isBoolean()
        .withMessage("The notification_enabled field must be a boolean."),
    body("cancellation_policy")
        .isBoolean()
        .withMessage("The cancellation_policy field must be a boolean."),
    (req: Request, res: Response, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Create an event
export const createEvent = async (
    user: User,
    eventData: {
        title: string;
        description: string;
        start_time: Date;
        end_time: Date;
        guests: string[];
        is_public: boolean;
        notification_enabled: boolean;
        cancellation_policy: boolean;
    }
) => {
    const {
        title,
        description,
        start_time,
        end_time,
        guests,
        is_public,
        notification_enabled,
        cancellation_policy,
    } = eventData;

    const { data, error } = await supabase.from("events").insert([
        {
            user_id: user.id,
            title,
            description,
            start_time,
            end_time,
            is_public,
            notification_enabled,
            cancellation_policy,
            guests,
        },
    ]);

    if (error) {
        throw new Error(`Error creating the event: ${error.message}`);
    }

    if (user.email) {
        sendEmail(
            user.email,
            "Event Created",
            `The event "${title}" has been successfully created.`
        );
    }

    return data;
};

// Check if a time slot is already booked
export const checkOverlappingEvents = async (
    userId: string,
    start_time: Date,
    end_time: Date
) => {
    const { data: overlapping, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", userId)
        .or(`(start_time.lt.${end_time},end_time.gt.${start_time})`);

    if (error) {
        throw new Error(`Error while checking for conflicts: ${error.message}`);
    }

    return overlapping;
};

// Retrieve user events
export const getUserEvents = async (userId: string) => {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        throw new Error(`Error retrieving events: ${error.message}`);
    }

    return data;
};

// Update an event
export const updateEvent = async (
    eventId: number,
    updatedData: {
        title?: string;
        description?: string;
        start_time?: Date;
        end_time?: Date;
        guests?: string[];
    }
) => {
    const { data, error } = await supabase
        .from("events")
        .update(updatedData)
        .eq("id", eventId);

    if (error) {
        throw new Error(`Error updating the event: ${error.message}`);
    }

    return data;
};

// Delete an event
export const deleteEvent = async (eventId: number) => {
    const { data, error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);

    if (error) {
        throw new Error(`Error deleting the event: ${error.message}`);
    }

    return data;
};
