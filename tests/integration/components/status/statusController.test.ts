import request from "supertest";
import express from "express";
import { getConnection } from "typeorm";

// beforeAll(async () => {
//   await connection.create();
// });

afterAll(async () => {
  await getConnection().close();
});

// beforeEach(async () => {
//   await connection.clear();
// });

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const app = express();
    await require("./loaders").default({ expressApp: app });

    const response = await request(app).get("/status");

    expect(response.statusCode).toBe(200);
  });
});
