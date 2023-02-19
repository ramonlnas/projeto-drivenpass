import { signUp, signIn } from "../controllers/authController";
import { Router } from "express";
import signUpMiddleware from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

export default authRouter;
