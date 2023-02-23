import { titleExist } from "../err/title-exist";
import Cryptr from "cryptr";
import { invalidRequest } from "../err/invalidRequest";
import { WifiInput } from "protocols/wifiProtocols";
import wifiRepository from "../repository/wifiRepository";
const cryptr = new Cryptr(process.env.CRYPTR);

async function wifiPost(wifi: WifiInput) {
  const { title, network, password, userId } = wifi;

  try {
    const encryptedPassword = await cryptPass(password);

    await wifiRepository.postWifi({
      title,
      network,
      encryptedPassword,
      userId,
    });
  } catch (err) {
    throw err;
  }
}

async function getWifi(userId: number) {
  const userWifi = await wifiRepository.getWifi(userId);
  const newUserWifi = userWifi.map((wifi) => {
    return {
      ...wifi,
      password: cryptr.decrypt(wifi.password),
    };
  });
  return newUserWifi;
}

async function findOneWifi(wifiId: number, userId: number) {
  const confirmUser = await wifiRepository.confirmUser(wifiId);

  if (confirmUser.userId !== userId) {
    throw invalidRequest();
  }

  const newConfirmUser = cryptr.decrypt(confirmUser.password);

  const sendRightFormat = {
    id: confirmUser.id,
    title: confirmUser.title,
    network: confirmUser.network,
    password: newConfirmUser,
    userId: confirmUser.userId,
  };

  return sendRightFormat;
}

async function deletWifi(wifiId: number, userId: number) {
    const confirmUser = await wifiRepository.confirmUser(wifiId);
  
    if (confirmUser.userId !== userId) {
      throw invalidRequest();
    }
  
    await wifiRepository.deletCredential(wifiId);
  }
  

async function cryptPass(password: string) {
  const encryptedPass = cryptr.encrypt(password);

  return encryptedPass;
}

const wifiService = {
  wifiPost,
  getWifi,
  findOneWifi,
  deletWifi
};

export default wifiService;
