import { NextFunction, Request, response, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/database";
import authRepository from "../repository/authRepository";
import { User } from "@prisma/client";
import { not_Found_User } from "../err/not-found-user";

type Token = Omit<User, "password" | "email">;

export async function hasToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  const secretKey = process.env.JWT_SECRET;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const { userId } = jwt.verify(token, secretKey) as JwtPayload;
    
    const verifyUser = await authRepository.findUser(userId);

    if (!verifyUser) {
      throw not_Found_User();
    }
    console.log(userId, "chegou no hasTOken")
    res.locals.user = userId;
  } catch {
    return res.status(401).send("invalid token");
  }

  next();
}
