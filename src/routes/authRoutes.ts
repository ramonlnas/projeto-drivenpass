import { signUp, signIn } from "../controllers/authController";
import { Router } from "express";
import validSchema from "../middlewares/validSchema";

const authRouter = Router();

authRouter.post("/signup",  signUp);
authRouter.post("/signin", signIn);

export default authRouter;
