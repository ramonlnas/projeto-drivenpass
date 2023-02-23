import {
  getCredentials,
  getEspecificCredential,
  postCredential,
  deletCredential,
} from "../controllers/credentialsController";
import { Router } from "express";
import { hasToken } from "../middlewares/authMiddleware";
import validMiddleware from "../middlewares/validSchema";
import { CredentialSchema } from "../models/credentialSchema";
const credentialRouter = Router();

credentialRouter.post(
  "/credentials",
  validMiddleware.validCredential(CredentialSchema),
  hasToken,
  postCredential
);
credentialRouter.get("/credentials", hasToken, getCredentials);
credentialRouter.get(
  "/credentials/:credentialId",
  hasToken,
  getEspecificCredential
);
credentialRouter.delete("/credentials/:credentialId", hasToken, deletCredential);
export default credentialRouter;
