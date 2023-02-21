import prisma from "../db/database";
import { CredentialUser } from "protocols/credentialProtocols";

async function findUser(title: string) {
    const getUser = await prisma.credential.findFirst({
        where: {
            title: title === null ? title : undefined
        }
    })

    return getUser
}

async function postCredential(credential: CredentialUser ) {
    await prisma.credential.create({
        data: {
            userId: credential.userId,
            title: credential.title,
            username: credential.username,
            url: credential.url,
            password: credential.encryptedPassword
        }
    })
}

const credentialRepository = {
    findUser, 
    postCredential
}

export default credentialRepository