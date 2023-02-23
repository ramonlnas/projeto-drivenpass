import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { authSchema } from "../models/authSchema";

export function validSchema(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const validation = schema.validate(user, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    res.locals.user = user;

    next();
  };
}

export function validCredential(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const validation = schema.validate(user, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    res.locals.user = user;

    next();
  };
}

export function validWifi(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const validation = schema.validate(user, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    res.locals.user = user;

    next();
  };
}

const validMiddleware = {
  validSchema,
  validCredential,
  validWifi
}

export default validMiddleware