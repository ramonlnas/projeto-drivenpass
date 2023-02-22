import joi from "joi";
import { Credential } from "@prisma/client";

type CredentialInput = Omit<Credential, "id">

export const CredentialSchema = joi.object<CredentialInput>({
    title: joi.string().required(),
    url: joi.string().uri().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    userId: joi.number().required()
})