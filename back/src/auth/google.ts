// src/auth/google.ts
import passport from "passport";
import { User } from "../types/interface";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { supabase } from "../lib/supabaseClient";
import { generateJWT } from "../lib/jwt";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
            if (!profile.emails || profile.emails.length === 0) {
                return done(new Error("No email found"), false);
            }

            const email = profile.emails[0].value;
            const name = profile.displayName;
            const id_google = profile.id;
            const avatar = profile.photos?.[0]?.value ?? null;
            console.log("✅ Profil used :", profile);
            console.log("✅ AccessToken used :", _accessToken);
            try {
                const { data, error } = await supabase
                    .from("users")
                    .upsert(
                        [
                            {
                                id_google: id_google,
                                email: email,
                                name: name,
                                avatar: avatar,
                            },
                        ],
                        {
                            onConflict: "id_google",
                        }
                    )
                    .select();

                if (error) throw error;

                console.log("✅ User saved :", data);

                const jwtPayload = { id_google, email, name };
                const token = generateJWT(jwtPayload);

                return done(null, {
                    token,
                    id_google,
                    accessToken: _accessToken,
                    refreshToken: _refreshToken,
                });
            } catch (err) {
                console.error("🔥 Error callback Google :", err);
                return done(err as Error, false);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, (user as User).id_google);
});

passport.deserializeUser(async (id_google, done) => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id_google", id_google)
        .single();

    if (error) {
        console.error("Error deserializeUser :", error);
        return done(error, null);
    }

    if (!data) {
        console.error("User not found with id :", data.id);
        return done(new Error("User not found"), null);
    }

    console.log("✅ User deserializeUser :", data);
    return done(null, data); // Retourne l'utilisateur complet
});
