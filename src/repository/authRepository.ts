import prisma from "../db/database";
import { Prisma } from "@prisma/client";
import { AuthEntity, AuthHash } from "protocols/authProtocols";

async function findEmail(email: string) {
  const existUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return existUser;
}

async function insertUser(email: string, hashPassword: string) {
  await prisma.user.create({
    data: {
      email,
      password: hashPassword
    },
  });
}

async function findUser(userData: number) {
  const findUser = await prisma.user.findFirst({
    where: {
      id: userData
    }
  })

  return findUser
}


const authRepository = {
  findEmail,
  insertUser,
  findUser
};

export default authRepository;
