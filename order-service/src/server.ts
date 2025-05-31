import {createApp } from "./app";

const start = async () => {
    const app = await createApp();

    try {
        await app.listen({ port: 5000, host: '0.0.0.0' }, () => {
            console.log("Server is running on http://localhost:3000");
        });
        
    } catch (error) {
        console.error("Error starting the application:", error);
        process.exit(1);
        
    }
};

start().catch((error) => {
    console.error("Error during application startup:", error);
    process.exit(1);
});