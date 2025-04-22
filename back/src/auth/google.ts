// src/auth/google.ts
import passport from "passport";
import { User } from "../types/interface";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { generateJWT } from "../lib/jwt";
import { Request } from "express";
import { getUserByIdGoogle, upsertUser } from "../lib/supabaseQueries";

// Google OAuth strategy
// This strategy is used to authenticate users using their Google account
// It uses the Google OAuth 2.0 API to obtain user information
// and create a new user in the database if they don't exist
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!,
            passReqToCallback: true,
            scope: [
                "https://www.googleapis.com/auth/calendar.readonly",
                "https://www.googleapis.com/auth/calendar.events",
                "https://www.googleapis.com/auth/calendar",
            ],
        },
        async (
            _req: Request,
            accessToken: string,
            _refreshToken: string,
            profile: passport.Profile,
            done: (error: Error | null, user?: User) => void
        ) => {
            if (!profile.emails || profile.emails.length === 0) {
                return done(new Error("No email found"), undefined);
            }

            const email = profile.emails[0].value;
            const name = profile.displayName;
            const id_google = profile.id;
            const avatar = profile.photos?.[0]?.value ?? "";
            const todayDate = new Date();

            const jwtPayload = { id_google, email, name };
            const token = generateJWT(jwtPayload);

            console.log("✅ Profil used :", profile);
            console.log("✅ AccessToken used :", accessToken);
            try {
                const data = await upsertUser(
                    id_google,
                    email,
                    name,
                    avatar,
                    token,
                    accessToken
                );

                console.log("✅ User saved :", data);

                let id = data[0].id;

                if (!data) {
                    const dataUser = await getUserByIdGoogle(id_google);
                    if (!dataUser)
                        console.error(
                            "🔥 Error callback Google No User in DB :"
                        );

                    id = dataUser.id;
                }

                return done(null, {
                    id,
                    id_google,
                    email,
                    name,
                    avatar,
                    token,
                    accessToken,
                    created_at: todayDate,
                    updated_at: todayDate,
                });
            } catch (error) {
                console.error("🔥 Error callback Google :", error);
                return done(error as Error, undefined);
            }
        }
    )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
    done(null, (user as User).id_google);
});

// Deserialize user from session
passport.deserializeUser(
    async (
        id_google: string,
        done: (err: Error | null, user?: User | null) => void
    ) => {
        const dataUser = await getUserByIdGoogle(id_google);

        if (!dataUser) {
            console.error("User not found with id :", dataUser.id);
            return done(new Error("User not found"), null);
        }

        console.log("✅ User deserializeUser :", dataUser);
        return done(null, dataUser);
    }
);
