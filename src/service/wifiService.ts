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

async function cryptPass(password: string) {
  const encryptedPass = cryptr.encrypt(password);

  return encryptedPass;
}

const wifiService = {
  wifiPost,
};

export default wifiService;
