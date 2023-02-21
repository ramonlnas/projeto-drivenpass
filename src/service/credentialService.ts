import { titleExist } from "../err/title-exist";
import {
  CredentialEntity,
  CredentialUser,
  CredentialPost,
} from "protocols/credentialProtocols";
import credentialRepository from "../repository/credentialRepository";
const Cryptr = require("cryptr");

async function postCredential(credential: CredentialPost) {
  const { url, username, password, title, userId } = credential;

  // await credentialExist(title);

  const encryptedPassword = await cryptPass(password);

  await credentialRepository.postCredential({
    url,
    username,
    title,
    encryptedPassword,
    userId,
  });
}

async function credentialExist(title: string) {
  const credentialExist = await credentialRepository.findUser(title);

  if (credentialExist) {
    throw titleExist();
  }

  return credentialExist;
}

async function cryptPass(password: string) {
  const cryptr = new Cryptr("secret");
  const encryptedPass = cryptr.encrypt(password);

  return encryptedPass;
}

const credentialService = {
  postCredential,
  credentialExist,
};

export default credentialService;
