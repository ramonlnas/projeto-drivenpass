import { Request, Response } from "express";
import httpStatus, { BAD_REQUEST, OK } from "http-status";
import wifiService from "../service/wifiService";
import { WifiPost } from "../protocols/wifiProtocols";

export async function postWifi(req: Request, res: Response) {
  const { title, network, password } = req.body as WifiPost;
  const userId = res.locals.user;

  try {
    await wifiService.wifiPost({
      title,
      network,
      password,
      userId,
    });
    return res.sendStatus(httpStatus.OK);
  } catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function getWifi(_req: Request, res: Response) {
  const userId = res.locals.user;
  try {
    const getWifi = await wifiService.getWifi(userId);
    return res.status(httpStatus.OK).send(getWifi);
  } catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getEspecificWifi(req: Request, res: Response) {
  const { wifiId } = req.params;
  const userId = res.locals.user;
  try {
    const wifi = await wifiService.findOneWifi(
      parseInt(wifiId),
      userId
    );
    return res.status(httpStatus.OK).send(wifi);
  } catch (err) {
    console.log(err);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
