import { Router } from "express";
import authRouter from "./authRoutes";
import credentialRouter from "./credentialsRoutes";

const router = Router()

router.use(authRouter)
router.use(credentialRouter)

export default router