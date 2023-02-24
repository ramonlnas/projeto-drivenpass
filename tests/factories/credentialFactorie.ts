import prisma from "@/db/database";
import { faker } from "@faker-js/faker";
import { Credential } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Users } from "@/protocols";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR);

export async function generateValidCredential(userId:number) {
  const password = cryptr.encrypt(faker.internet.password(11))
  return prisma.credential.create({
      data: {
          title:faker.name.firstName(),
          url: faker.internet.url(),
          username: faker.internet.userName(),
          password: "11111111111",
          userId
      }
  })
}

export const generateValidBody = () => ({
  id: Number(faker.random.numeric()),
  email: faker.internet.email(),
  password: faker.internet.password(10),
});


export async function generateValidToken(user: Users) {
  const token = jwt.sign({ userId: Number(user.id) }, process.env.JWT_SECRET);
  return token;
}


