import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import { findUser, updateUser } from "../services/authServices.js";

const { DB_HOST_TEST, PORT = 3000 } = process.env;

describe("test api/users/login", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await updateUser({ _id: "66546899e917698dfd2ea3ea" }, { token: null });
  });

  test("test login controller", async () => {
    const loginData = {
      email: "user3@gmail.com",
      password: "Abc123456",
    };

    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");
    expect(body).toHaveProperty("user");
    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
    expect(typeof body.user.email === "string").toBeTruthy();
    expect(typeof body.user.subscription === "string").toBeTruthy();

    const user = await findUser({ email: loginData.email });
    expect(user.token).not.toBeNull();
    expect(user.email).toBe(loginData.email);
  });
});
