// src/routes/home.routes.ts
import { Router, Request, Response } from "express";

const router = Router();

// Simple health check endpoint
router.get("/", (_req: Request, res: Response) => {
    const currentDate = new Date();
    res.status(200).send(`✅ Backend is running - Date: ${currentDate.toLocaleDateString()}, Time: ${currentDate.toLocaleTimeString()}`);
});

export default router;
