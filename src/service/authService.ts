import authController from "controllers/authController";
import { conflictError } from "err/conflict-error";
import { BAD_REQUEST, NOT_FOUND } from "http-status";
import { AuthEntity } from "protocols/authProtocols";
import authRepository from "repository/authRepository";
import bcrypt from "bcrypt";

async function signUp(auth: AuthEntity) {
  const { email, password} = auth;

  const emailExist = existEmail(email);

  if (emailExist) {
    throw conflictError();
  }

  const hashPassword = bcrypt.hashSync(password, 12);

  await authRepository.insertUser(email, hashPassword);
}

async function existEmail(email: string) {
  const user = await authRepository.findEmail(email);
  return user;
}

const authService = {
    signUp,
    existEmail
}

export default authService