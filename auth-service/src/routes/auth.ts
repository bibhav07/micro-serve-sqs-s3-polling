import {Router} from "express";
import { register, login } from "../services/auth.service";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import { authenticate, AuthRequest } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validateBody";

const router = Router();

router.post("/register", validateBody(RegisterDto), async (req, res) => {
    try {
        const {email, name, password} = req.body
        const user = await register(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
});

router.post("/login", validateBody(LoginDto),async (req, res) => {
    try {
        const {email, password} = req.body
        const  token = await login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
});

router.get('/me', authenticate, async (req: AuthRequest, res) => {
  res.json({ userId: req.userId });
});


export default router;
// This code defines an Express router for authentication routes.