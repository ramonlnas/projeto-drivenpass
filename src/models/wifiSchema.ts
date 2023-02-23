import joi from "joi"
import { WifiInput } from "../protocols/wifiProtocols"

export const wifiSchema = joi.object<WifiInput>({
    title: joi.string().required(),
    network: joi.string().required(),
    password: joi.string().required(),
    userId: joi.number().required()
})
