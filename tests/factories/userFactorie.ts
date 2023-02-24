import { User } from "@/protocols/authProtocols";
import bcrypt from "bcrypt"
import prisma from "@/db/database";

export async function userCreated(body: User) {
    const hashedPassword = bcrypt.hashSync(body.password, 12)
    return await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword
      },
    });
}
