import {
  
} from "../controllers/credentialsController";
import { Router } from "express";
import { hasToken } from "../middlewares/authMiddleware";
import validMiddleware from "../middlewares/validSchema";
import { wifiSchema } from "../models/wifiSchema";
import { postWifi } from "../controllers/wifiController";

const wifiRouter = Router();

wifiRouter.post(
  "/wifi",
  validMiddleware.validWifi(wifiSchema),
  hasToken,
  postWifi
);

export default wifiRouter