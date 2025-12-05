const request = require("supertest");
const { CONFIG } = require("../../config");
const { isObjectValid, isPaginationValid } = require("./utils/utils");

const api = request(CONFIG.BACKEND.API_URL);

let cookie = "";
let id = "";

const expectItem = (obj) => {
  const properties = [
    "id",
    "username",
    "email",
    "password_hash",
    "full_name",
    "is_active",
    "created_at",
  ];
  const valid = isObjectValid(obj, properties);
  expect(valid).toBe(true);
};

describe("API Signup Test Scenario", () => {
  test("POST /api/auth/signup", async () => {
    const res = await api.post("/api/auth/signup").send({
      username: "test_signup",
      password: "1",
    });

    /* 
    {
      data: {
        id: '202512060128227454',
        username: 'test_signup',
        email: null,
        password_hash: '$2a$11$37AtAzX6Ni56.x4ncUKAUevoNiA6LQtFqUHtFI.Xhhx7H83YzUXqW',
        full_name: null,
        is_active: null,
        created_at: null
      },
      error: null
    }
    */
    console.log("POST /api/auth/signup: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expectItem(res.body.data);

    id = res.body.data.id;
  });

  test("POST /api/auth/login", async () => {
    if (!id) {
      console.log("No user created!");
      return;
    }

    const res = await api.post("/api/auth/login").send({
      username: CONFIG.BACKEND.ADMIN_USERNAME,
      password: CONFIG.BACKEND.ADMIN_PASSWORD,
    });

    console.log("POST /api/auth/login: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    cookie = res.headers["set-cookie"].map((c) => c.split(";")[0]).join("; ");

    expect(cookie).toBeDefined();

    console.log("Cookie received: " + cookie);
  });

  test("DELETE /api/users/id", async () => {
    if (!cookie) {
      console.log("No cookie!");
      return;
    }

    const res = await api
      .delete(`/api/users/${id}`)
      .set("Cookie", cookie)
      .set("Accept", "application/json");

    console.log("DELETE /api/users/id: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expectItem(res.body.data);
  });

  afterAll(() => {});
});
