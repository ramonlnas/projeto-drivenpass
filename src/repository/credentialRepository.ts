import prisma from "../db/database";
import { CredentialUser } from "protocols/credentialProtocols";

async function findUser(title: string) {
    const getUser = await prisma.credential.findFirst({
        where: {
            title
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

async function getCredentials(userId: number) {
    const getUserCredentials = await prisma.credential.findMany({
        where: {
            userId
        }
    })

    return getUserCredentials
}

const credentialRepository = {
    findUser, 
    postCredential,
    getCredentials
}

export default credentialRepository