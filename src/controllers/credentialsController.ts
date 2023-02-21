import { Request, Response } from "express";
import httpStatus, { BAD_REQUEST, OK } from "http-status";
import { CredentialEntity } from "protocols/credentialProtocols";
import credentialService from "../service/credentialService";

export async function postCredential(req: Request, res: Response) {
  const { url, username, password, title } = req.body as CredentialEntity;
  const { userId, iat, exp } = res.locals.user;

  try {
    await credentialService.postCredential({
      url,
      username,
      password,
      title,
      userId,
    });
    return res.sendStatus(httpStatus.OK);
  } catch (err) {
    console.log(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
