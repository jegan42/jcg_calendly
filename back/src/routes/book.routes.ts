// src/routes/book.routes.ts
import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";
import { requireJWTAuth } from "../middleware/jwtAuth";

const router = Router();

router.get(
    "/book/:slug",
    requireJWTAuth,
    async (req: Request, res: Response) => {
        const { slug } = req.params;

        const { data, error } = await supabase
            .from("event_types")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error || !data) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        res.json(data);
    }
);
