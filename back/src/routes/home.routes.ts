// src/routes/home.routes.ts
import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
    // Example: Fetching data from a table
    const getData = async () => {
        try {
            const { data, error } = await supabase.from("users").select("*");
            if (error) {
                console.error("Error fetching data:", error);
            } else {
                console.log("Fetched data:", data);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    getData();
    res.send("Welcome to the Home Page!");
});

export default router;
