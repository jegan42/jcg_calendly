// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Example usage
// This function fetches data from the "users" table and logs it to the console
const getData = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) console.error("Error:", error);
    else console.log("Data:", data);
};

getData();
