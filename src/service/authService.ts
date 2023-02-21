import { conflictError } from "../err/conflict-error";
import { BAD_REQUEST, NOT_FOUND } from "http-status";
import { AuthEntity } from "protocols/authProtocols";
import authRepository from "../repository/authRepository";
import bcrypt from "bcrypt";
import { not_Found_Error } from "../err/not-fount-error";
import jwt from "jsonwebtoken";

async function signUp(auth: AuthEntity) {
  const { email, password } = auth;

  await existEmail(email);
  const hashPassword = bcrypt.hashSync(password, 12);

  await authRepository.insertUser(email, hashPassword);
}

async function signIn(auth: AuthEntity) {
  const { email, password } = auth;

  const user = await authRepository.findEmail(email);

  if (!user) {
    throw not_Found_Error();
  }

  const passwordOk = bcrypt.compareSync(password, user.password);

  if (!passwordOk) {
    throw conflictError();
  }

  const token = await createSession(user.id)

  return token
}

async function existEmail(email: string) {
  const user = await authRepository.findEmail(email);

  if (user) {
    throw conflictError();
  }
  return user;
}

async function createSession(userId: number) {
  const secretKey=process.env.JWT_SECRET
  const token = jwt.sign({userId}, secretKey, {expiresIn: 86400}) 
  return token
}

const authService = {
  signUp,
  existEmail,
  signIn,
};

export default authService;
