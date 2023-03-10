import {
  
} from "../controllers/credentialsController";
import { Router } from "express";
import { hasToken } from "../middlewares/authMiddleware";
import validMiddleware from "../middlewares/validSchema";
import { wifiSchema } from "../models/wifiSchema";
import { getWifi, postWifi, getEspecificWifi, deletWifi } from "../controllers/wifiController";

const wifiRouter = Router();

wifiRouter.post(
  "/wifi",
  validMiddleware.validWifi(wifiSchema),
  hasToken,
  postWifi
);
wifiRouter.get("/wifi", hasToken, getWifi)
wifiRouter.get("/wifi/:wifiId", hasToken, getEspecificWifi)
wifiRouter.delete("/wifi/:wifiId", hasToken, deletWifi)

export default wifiRouter