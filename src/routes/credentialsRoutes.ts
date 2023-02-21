import { postCredential } from "../controllers/credentialsController";
import { Router } from "express";
import { hasToken } from "../middlewares/authMiddleware";

const credentialRouter = Router();

credentialRouter.post("/credentials", hasToken, postCredential);
// credentialRouter.get("/signin", signIn);

export default credentialRouter;
