import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import { zodErrorHandler } from "./middlewares/zodError.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  res.status(200).json({"message" :"User Service is healthy ✅"} );
});

app.use("/auth", authRouter);

app.use((err : any, req : any, res : any, next : any) => {
  zodErrorHandler(err, req, res, next);
})
app.listen(PORT, () => {
  console.log(`✅ User Service running on http://localhost:${PORT}`);
});
