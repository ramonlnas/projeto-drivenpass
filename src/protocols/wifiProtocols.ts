import { Network } from "@prisma/client"

export type WifiInput = Omit<Network, "id">

export type wifiEncrypted = {
    title: string,
    network: string,
    encryptedPassword: string,
    userId: number
}

export type WifiPost = Partial<Network>