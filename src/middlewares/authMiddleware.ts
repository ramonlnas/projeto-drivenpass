import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { authSchema } from "../models/authSchema";

export default function signUpMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const validation = authSchema.validate(user, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    res.locals.user = user;

    next();
  };
}
