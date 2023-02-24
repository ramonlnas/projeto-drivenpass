import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import prisma from "@/db/database";
import { faker } from "@faker-js/faker";

export async function userCreated(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(11);
  const hashedPassword = await bcrypt.hash(incomingPassword, 12);

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}

