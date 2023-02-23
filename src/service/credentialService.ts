import { titleExist } from "../err/title-exist";
import {
  CredentialEntity,
  CredentialUser,
  CredentialPost,
} from "protocols/credentialProtocols";
import credentialRepository from "../repository/credentialRepository";
import Cryptr from "cryptr";
import { invalidRequest } from "../err/invalidRequest";
const cryptr = new Cryptr(process.env.CRYPTR);

async function postCredential(credential: CredentialPost) {
  const { url, username, password, title, userId } = credential;
  try {
    await credentialExist(title, userId);

    const encryptedPassword = await cryptPass(password);

    await credentialRepository.postCredential({
      url,
      username,
      title,
      encryptedPassword,
      userId,
    });
  } catch (err) {
    throw err;
  }
}

async function credentialExist(title: string, userId: number) {
  const credentialsUser = await credentialRepository.getCredentials(userId)
  const verifyTitle = credentialsUser.filter((credential) => credential.title === title)

  if (verifyTitle.length !== 0) {
    throw titleExist();
  }

  return credentialExist;
}

async function cryptPass(password: string) {
  const encryptedPass = cryptr.encrypt(password);

  return encryptedPass;
}

async function getCredentials(userId: number) {
  const userCredentials = await credentialRepository.getCredentials(userId);
  const newUserCredentials = userCredentials.map((credentail) => {
    return {
      ...credentail,
      password: cryptr.decrypt(credentail.password)
    }
  });
  return newUserCredentials;
}

async function findOneCredential(credentialId: number, userId: number) {
  const confirmUser = await credentialRepository.confirmUser(credentialId)

  if(confirmUser.userId !== userId) {
    throw invalidRequest()
  }

  const newConfirmUser = cryptr.decrypt(confirmUser.password)

  const sendRightFormat = {
    id: confirmUser.id,
    title: confirmUser.title,
    username: confirmUser.username,
    password: newConfirmUser,
    userId: confirmUser.userId
  }

  return sendRightFormat
}

const credentialService = {
  postCredential,
  credentialExist,
  getCredentials,
  findOneCredential
};

export default credentialService;
