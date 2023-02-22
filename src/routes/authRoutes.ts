import { signUp, signIn } from "../controllers/authController";
import { Router } from "express";
import validSchema from "../middlewares/validSchema";
import { authSchema } from "../models/authSchema";
import validMiddleware from "../middlewares/validSchema";

const authRouter = Router();

authRouter.post("/signup", validMiddleware.validSchema(authSchema), signUp);
authRouter.post("/signin", signIn);

export default authRouter;
