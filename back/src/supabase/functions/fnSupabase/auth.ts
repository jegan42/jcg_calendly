// src/supabase/functions/fnSupabase/auth.ts
import { supabase } from "./lib/supabaseClient.js"; // Supabase Client
import { createJWT } from "./jwt.js"; // JWT Creation

export const handleAuth = async (req: Request) => {
    const { id_google, email, name, avatar } = await req.json(); // Example of retrieving user data

    // Save user data in Supabase
    const { data, error } = await supabase
        .from("users")
        .upsert([{ id_google, email, name, avatar }], {
            onConflict: "id_google",
        });
    console.log("✅ User saved :", data);

    if (error) {
        return new Response(JSON.stringify({ error }), { status: 500 });
    }

    // Create a JWT for the user
    const token = await createJWT({ id_google, email });

    return new Response(JSON.stringify({ success: true, token }), {
        status: 200,
    });
};
