import app from "app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import prisma from "db/database";
import { userCreated } from "../factories/userFactorie";

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

describe("POST SignIn", () => {
  it("should respond with status 422 when body is not given", async () => {
    const result = await server.post("/signin");
    expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should respond with status 404 when user is not found", async () => {
    const body = { email: "xxxxx@gmail.com", password: "xxxxxxxxxxx" };
    const response = await server.post("/signin").send(body);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  describe("when body is valid", () => {

    const generateBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(11),
    });

    it("should respond with status 404 if there is not found email", async () => {
      const body = generateBody();
      const response = await server.post("/signin").send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
      const body = generateBody();
      await userCreated(body);
      const response = await server.post("/signin").send({
        ...body,
        password: faker.internet.password(10),
      });
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe("when credentials are valid", () => {
      it("should respond with status 200", async () => {
        const body = generateBody();
        await userCreated(body);
        const response = await server.post("/signin").send(body);
        expect(response.status).toBe(httpStatus.OK);
      });
      it("should respond with token on body", async () => {
        const body = generateBody();
        await userCreated(body);
        const response = await server.post("/signin").send(body);
        expect(response.body.token).toBeDefined();
      });
    });
  });
});

describe("POST /signup", () => {
  it("should respond with status 422 when invalid body", async () => {
    const result = await server.post("/signup");
    expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when body is valid", () => {
    const generateBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });

    it("should respond with status 409 if email already is in use", async () => {
      const body = generateBody();
      await userCreated(body);
      const response = await server.post("/signup").send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200", async () => {
        const body = { email: "testednv@gmail.com", password: "12345678911" };
        const response = await server.post("/signup").send(body);

        expect(response.status).toBe(httpStatus.CREATED);
      });
    });
  });
});
