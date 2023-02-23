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

// async function wifiExist(title: string, userId: number) {
//   const wifiUser = await wifiRepository.getCredentials(userId);
//   const verifyTitle = wifiUser.filter(
//     (wifi) => wifi.title === title
//   );

//   if (verifyTitle.length !== 0) {
//     throw titleExist();
//   }

//   return wifiUser;
// }

async function cryptPass(password: string) {
  const encryptedPass = cryptr.encrypt(password);

  return encryptedPass;
}

const wifiService = {
  wifiPost,
  getWifi
};

export default wifiService;
