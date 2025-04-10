// src/routes/notification.routes.ts
import { Router, Request, Response } from "express";
import { sendEmail } from "../mailer/mailer";
import { requireJWTAuth } from "../middleware/jwtAuth";

const router = Router();

// 🚀 Route to send an event confirmation notification
router.post(
    "/send-event-notification",
    requireJWTAuth,
    async (req: Request, res: Response) => {
        const { _event_id, user_email, event_date, event_title } = req.body;

        try {
            const subject = `Confirmation de votre événement: ${event_title}`;
            const text = `Bonjour, \n\nVotre événement "${event_title}" est confirmé pour le ${event_date}. \n\nMerci de l'avoir planifié avec nous !`;

            sendEmail(user_email, subject, text);

            res.status(200).json({
                success: true,
                message: "Notification envoyée avec succès",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur lors de l'envoi de la notification",
                error: (error as Error).message,
            });
        }
    }
);

// 🚨 Route to send an event reminder
router.post(
    "/send-event-reminder",
    requireJWTAuth,
    async (req: Request, res: Response) => {
        const { _event_id, user_email, event_date, event_title } = req.body;

        try {
            const subject = `Rappel: Votre événement "${event_title}" approche`;
            const text = `Bonjour, \n\nCeci est un rappel pour votre événement "${event_title}" qui aura lieu le ${event_date}. \n\nNous avons hâte de vous voir !`;

            sendEmail(user_email, subject, text);

            res.status(200).json({
                success: true,
                message: "Rappel envoyé avec succès",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur lors de l'envoi du rappel",
                error: (error as Error).message,
            });
        }
    }
);

export default router;
