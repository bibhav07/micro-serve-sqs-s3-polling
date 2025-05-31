// Fastify app setup  
import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import orderRoutes from "./routes/order.routes";
import { initDB } from "./config/db";

dotenv.config();

export const createApp = async () => {
    const fastify = Fastify({
        logger: true,
    });
    
    
    // Register middlewares
    fastify.register(cors);

    fastify.register(formBody);

    // Initialize database connection
    await initDB();
    
    // Register routes
    orderRoutes(fastify);
    
    return fastify;
}