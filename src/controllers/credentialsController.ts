import { Request, Response } from "express";
import httpStatus, { BAD_REQUEST, OK } from "http-status";
import { CredentialEntity } from "protocols/credentialProtocols";
import credentialService from "../service/credentialService";

export async function postCredential(req: Request, res: Response) {
  const { url, username, password, title } = req.body as CredentialEntity;
  const userId = res.locals.user;

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
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function getCredentials(_req: Request, res: Response) {
  const userId = res.locals.user;
  try {
    const getCredentials = await credentialService.getCredentials(userId);
    return res.status(httpStatus.OK).send(getCredentials);
  } catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getEspecificCredential(req: Request, res: Response) {
  const { credentialId } = req.params;
  const userId = res.locals.user;
  try {
    const credential = await credentialService.findOneCredential(
      parseInt(credentialId),
      userId
    );
    return res.status(httpStatus.OK).send(credential);
  } catch (err) {
    console.log(err);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function deletCredential(req: Request, res: Response) {
  const { credentialId } = req.params;
  const userId = res.locals.user;

  try {
    await credentialService.deletCredential(parseInt(credentialId), userId)
    return res.sendStatus(httpStatus.NO_CONTENT)
  } catch (err) {
    console.log(err);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
