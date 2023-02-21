import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { authSchema } from "../models/authSchema";

export default function validSchema(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const validation = authSchema.validate(user, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    res.locals.user = user;

    return next();
  };
}
