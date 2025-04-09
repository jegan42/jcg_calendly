// global.d.ts
import { User } from "./src/types/interface";

declare global {
    namespace Express {
        interface Request {
            user?: User;
            isAuthenticated?: () => boolean;
            cookies?: Record<string, string>;
        }

        interface Response {
            cookie?: (name: string, val: any, options?: any) => void;
            clearCookie?: (name: string, options?: any) => void;
            redirect?: (url: string) => void;
        }
    }
}
