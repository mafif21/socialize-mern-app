import exress from "express";
import { login } from "../controllers/AuthController.js";
const router = exress.Router();

router.post("/login", login);

export default router;
