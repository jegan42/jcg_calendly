// src/mailer/mailer.ts
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

// Function to send an email
export const sendEmail = (to: string, subject: string, text: string) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(
        mailOptions,
        (error: Error | null, info: SMTPTransport.SentMessageInfo) => {
            if (error) {
                console.log("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        }
    );
};

// Example usage: sending a confirmation email after creating an event
// import { sendEmail } from './mailer';
// sendEmail(
//     'user@example.com',
//     'Creating an event',
//     'Your event has been successfully created.'
// );
