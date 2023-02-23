import prisma from "../db/database"
import { wifiEncrypted } from "protocols/wifiProtocols"

async function postWifi(wifi: wifiEncrypted ) {
    await prisma.network.create({
        data: {
            title: wifi.title,
            network: wifi.network,
            password: wifi.encryptedPassword,
            userId: wifi.userId
        }
    })
}
const wifiRepository = {
    postWifi
}

export default wifiRepository