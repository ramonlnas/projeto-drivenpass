import { Request, Response } from "express";
import httpStatus, { BAD_REQUEST, OK } from "http-status";
import { AuthEntity } from "protocols/authProtocols";
import authService from "../service/authService";

export async function signUp(req: Request, res: Response) {
  const { email, password } = res.locals.user as AuthEntity;

  try {
    await authService.signUp({ email, password });
    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body as AuthEntity;

  try{
    const result = await authService.signIn({email, password})
    return res.status(httpStatus.OK).send(result)
  } catch(err) {
    console.log(err)
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const authController = {
  signIn,
  signUp,
};

export default authController;
