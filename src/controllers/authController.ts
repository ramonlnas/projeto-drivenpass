import { Request, Response } from "express";
import httpStatus, { BAD_REQUEST, OK } from "http-status";
import jwt from "jsonwebtoken";
import { AuthEntity } from "protocols/authProtocols";
import authService from "../service/authService";

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body as AuthEntity;

  try {
    const result = await authService.signUp({ email, password });
    return res.status(httpStatus.CREATED).send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(BAD_REQUEST);
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body as AuthEntity;

  try{
    const result = await authService.signIn({email, password})
    return res.status(httpStatus.OK).send(result)
  } catch(err) {
    console.log(err)
    return res.sendStatus(BAD_REQUEST);
  }
}

const authController = {
  signIn,
  signUp,
};

export default authController;
