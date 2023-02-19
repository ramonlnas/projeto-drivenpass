import joi from "joi";
import { AuthEntity } from "protocols/authProtocols";

export const authSchema = joi.object<AuthEntity>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});
