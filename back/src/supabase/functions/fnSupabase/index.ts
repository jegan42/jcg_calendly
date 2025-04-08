// src/supabase/functions/fnSupabase/index.ts
import InSpatialServer from "@inspatial/serve";
import { verifyJWT } from "./jwt.js"; // Importing the JWT verification function
import { handleAuth } from "./auth.js"; // Importing the authentication logic

// Create a server with InSpatial Serve
const server = new InSpatialServer({
    extensions: [], // Add your extensions if necessary
    async handleRequest(req: Request) {
        if (req.method === "POST") {
            const url = new URL(req.url);
            // Route for authentication
            if (url.pathname === "/auth") {
                return await handleAuth(req);
            }
            // JWT verification for all other routes
            const token = req.headers.get("Authorization")?.split(" ")[1];
            if (token) {
                const decoded = await verifyJWT(token);
                if (decoded) {
                    return new Response(
                        JSON.stringify({
                            message: "User authenticated",
                            user: decoded,
                        }),
                        { status: 200 }
                    );
                } else {
                    return new Response("Invalid token", { status: 403 });
                }
            }
            return new Response("Token missing", { status: 401 });
        }
        return new Response("Method Not Allowed", { status: 405 });
    },
});

// Start the InSpatial server
server.run();
