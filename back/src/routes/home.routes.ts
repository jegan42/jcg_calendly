// src/routes/home.routes.ts
import { Router, Request, Response } from "express";

const router = Router();

// Simple health check endpoint
router.get("/", (_req: Request, res: Response) => {
    res.status(200).send("✅ Backend is running");
});

export default router;
