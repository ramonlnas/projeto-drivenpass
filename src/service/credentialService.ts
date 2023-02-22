import { titleExist } from "../err/title-exist";
import {
  CredentialEntity,
  CredentialUser,
  CredentialPost,
} from "protocols/credentialProtocols";
import credentialRepository from "../repository/credentialRepository";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR);

async function postCredential(credential: CredentialPost) {
  const { url, username, password, title, userId } = credential;
  try {
    await credentialExist(title);

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

async function credentialExist(title: string) {
  const credentialExist = await credentialRepository.findUser(title);

  if (credentialExist) {
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

// async function findOneCredential(credentialId: number) {
//   await
// }

const credentialService = {
  postCredential,
  credentialExist,
  getCredentials,
};

export default credentialService;
