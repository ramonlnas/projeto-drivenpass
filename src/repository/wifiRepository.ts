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

async function getWifi(userId: number) {
    const getUserCredentials = await prisma.network.findMany({
        where: {
            userId
        }
    })

    return getUserCredentials
}


const wifiRepository = {
    postWifi,
    getWifi
}

export default wifiRepository