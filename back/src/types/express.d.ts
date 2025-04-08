// src/types/express.d.ts
import { User } from "./user";

declare global {
    namespace Express {
        interface Request {
            user?: User; // Declares that `req.user` will be an object of type `User`
        }
    }
}
