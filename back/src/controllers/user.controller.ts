// src/controllers/user.controller.ts
import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response) => {
    const { email, _password } = req.body;

    // TODO: Add create user logic here
    res.status(201).json({ message: `User ${email} saved !` });
};
