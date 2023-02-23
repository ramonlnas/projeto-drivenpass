import { Request, Response } from "express";
import httpStatus, { BAD_REQUEST, OK } from "http-status";
import wifiService from "../service/wifiService";
import { WifiPost } from "../protocols/wifiProtocols"

export async function postWifi(req: Request, res: Response) {
  const { title, network, password } = req.body as WifiPost;
  const userId = res.locals.user;

  try {
    await wifiService.wifiPost({
      title,
      network,
      password,
      userId
    });
    return res.sendStatus(httpStatus.OK);
  } catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

