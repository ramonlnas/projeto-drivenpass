import app from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { userCreated } from "../factories/userFactorie";
import { generateValidCredential, generateValidBody, generateValidToken} from "../factories/credentialFactorie";

import prisma from "@/db/database";

beforeEach(async () => {
  await prisma.credential.deleteMany({});
  await prisma.network.deleteMany({});
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.credential.deleteMany({});
  await prisma.network.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
});

const server = supertest(app);

describe("POST /credentials", () => {
  it("When invalid body", async () => {
    const result = await server.post("/credentials");
    expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  // não consegui fazer a credential ficar no formato certo, com isso ela cai no 422 :(

  describe("Valid token is passed", () => {
    const generateCredential = () => ({
      title: faker.name.firstName(),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: faker.internet.url(),
    });

    it("Valid token is passed but body doesnot send should respond 401", async () => {
      const user = await generateValidBody();
      const token = await generateValidToken(user);
      const result = await server
        .post("/credentials")
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("Valid token is passed, in the wrong format result 401", async () => {
      const user = await generateValidBody();
      const body = {
        tle: faker.name.firstName(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.url(),
      };
      const token = await generateValidToken(user);
      const result = await server
        .post("/credentials")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(result.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("Valid token and body should respond 200", async () => {
      const userBody = generateValidBody();
      const user = await userCreated(userBody);
      const body = generateCredential();
      const token = await generateValidToken({
        id: user.id,
        email: user.email,
        password: user.password,
      });
      console.log(token);
      const result = await server
        .post("/credentials")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(result.status).toBe(httpStatus.OK);
    });
    it("Credential with the same name", async () => {
      const userBody = generateValidBody();
      const user = await userCreated(userBody);
      const credential = await generateValidCredential(user.id);

      const token = await generateValidToken({
        id: user.id,
        email: user.email,
        password: userBody.password,
      });
      const result = await server
        .post("/credentials")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: credential.title,
          url: credential.url,
          username: credential.username,
          password: credential.password,
        });
      expect(result.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });
});

describe("GET /credentials", () => {
  const generateCredential = () => ({
    title: faker.name.firstName(),
    url: faker.internet.url(),
    username: faker.internet.userName(),
    password: faker.internet.url(),
  });


  describe("Right token is passed", () => {
    it("Credential were previosly inserted to this user", async () => {
      const userBody = generateValidBody();
      const user = await userCreated(userBody);
      const token = await generateValidToken({
        id: user.id,
        email: user.email,
        password: user.password,
      });
      const body = await generateCredential();
      await generateValidCredential(Number(user.id));
      const response = await server
        .get("/credentials")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: expect.any(String),
            url: expect.any(String),
            username: expect.any(String),
            password: expect.any(String),
          }),
        ])
      );
    });
  });
});

describe("GET /credentials/:credentialsId", () => {
  const generateCredential = () => ({
    title: faker.name.firstName(),
    url: faker.internet.url(),
    username: faker.internet.userName(),
    password: faker.internet.url(),
  });

  it("No token is provided should respond 401", async () => {
    const result = await server.get("/credentials/1");
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Wrong token is provided should respond 401", async () => {
    const token = "XXXXXXX";
    const result = await server
      .get("/credentials/1")
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("Right token is provided", () => {
    it("Succesfull request made", async () => {
      const body = await generateCredential();
      const userBody = generateValidBody();
      const user = await userCreated(userBody);
      const token = await generateValidToken({
        id: user.id,
        email: user.email,
        password: user.password,
      });
      const credential = await generateValidCredential(Number(user.id));
      const result = await server
        .get(`/credentials/${credential.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(result.status).toBe(httpStatus.OK);
      expect(result.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
          userId: expect.any(Number),
        })
      );
    });
  });
});

describe("DELETE /credentials/:credentialsId", () => {
  const generateCredential = () => ({
    title: faker.name.firstName(),
    url: faker.internet.url(),
    username: faker.internet.userName(),
    password: faker.internet.url(),
  });

  it("No token is provided, should respond 401", async () => {
    const result = await server.delete("/credentials/1");
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Wrong token is provided, should respond 401", async () => {
    const token = "123456";
    const result = await server
      .delete("/credentials/1")
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("Valid token is passed", () => {
    it("Not a valid id passed", async () => {
      const user = generateValidBody();
      const body = generateCredential();
      const token = await generateValidToken(user);
      const randoNumber = faker.random.numeric(3);
      const result = await server
        .delete(`/credentials/${randoNumber}`)
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("Valid id is passed", async () => {
      const body = await generateCredential();
      const userBody = generateValidBody();
      const user = await userCreated(userBody);
      const token = await generateValidToken({
        id: user.id,
        email: user.email,
        password: user.password,
      });
      const credential = await generateValidCredential(Number(user.id));

      const result = await server
        .delete(`/credentials/${credential.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(httpStatus.NO_CONTENT);
    });
  });
});
