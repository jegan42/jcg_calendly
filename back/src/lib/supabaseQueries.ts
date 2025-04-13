// src/lib/supabaseUsersQueries.ts
import { supabase } from "./supabaseClient";

// Add or update a user in the database
export const upsertUser = async (
    id_google: string,
    email: string,
    name: string,
    avatar: string,
    token: string,
    accessToken: string
) => {
    const todayDate = new Date();

    try {
        const { data, error } = await supabase
            .from("users")
            .upsert(
                [
                    {
                        id_google,
                        email,
                        name,
                        avatar,
                        token,
                        accessToken,
                        created_at: todayDate,
                        updated_at: todayDate,
                    },
                ],
                {
                    onConflict: "id_google",
                }
            )
            .select();

        if (error) {
            throw new Error(error.message);
        }

        console.log("User upserted:", data);
        return data;
    } catch (error) {
        console.error("Erreur lors de l'upsert de l'utilisateur:", error);
        throw error;
    }
};

// get a user by id_google
export const getUserByIdGoogle = async (id_google: string) => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id_google", id_google)
        .single();

    if (error) {
        console.error(
            "Erreur lors de la récupération de l'utilisateur:",
            error
        );
        return null;
    }
    return data;
};

// get a user by id
export const getUserById = async (id: string) => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(
            "Erreur lors de la récupération de l'utilisateur:",
            error
        );
        return null;
    }
    return data;
};

// get all users
export const getAllUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
        console.error(
            "Erreur lors de la récupération des utilisateurs:",
            error
        );
        return [];
    }
    return data;
};
