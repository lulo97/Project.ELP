const request = require("supertest");
const { CONFIG } = require("../../config");
const { isObjectValid, isPaginationValid } = require("./utils/utils");

const api = request(CONFIG.BACKEND.API_URL);

let cookie = "";
let id = "";

const expectItem = (obj) => {
  const properties = ["id", "source", "name", "user_id"];
  const valid = isObjectValid(obj, properties);
  expect(valid).toBe(true);
};

describe("API sources Test Scenario", () => {
  test("POST /api/auth/login", async () => {
    const res = await api
      .post("/api/auth/login")
      .send({
        username: CONFIG.BACKEND.USERNAME,
        password: CONFIG.BACKEND.PASSWORD,
      });

    console.log("POST /api/auth/login: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    cookie = res.headers["set-cookie"].map((c) => c.split(";")[0]).join("; ");

    expect(cookie).toBeDefined();

    console.log("Cookie received: " + cookie);
  });

  test("GET /api/sources", async () => {
    const res = await api.get("/api/sources").set("Cookie", cookie);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach(expectItem);

    expect(isPaginationValid(res.body)).toBe(true);
  });

  test("POST /api/sources", async () => {
    const res = await api.post("/api/sources").set("Cookie", cookie).send({
      id: "",
      source: "current_source",
      name: "name",
    });

    console.log("POST /api/sources: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    const data = res.body.data;
    expectItem(data); //If this fail then this test will exit (id wouldn't be set)
    id = data.id;
    console.log("Created id received: " + id);
  });

  test("POST malicious html /api/sources", async () => {
    const res = await api.post("/api/sources").set("Cookie", cookie).send({
      id: "",
      source: "<p onclick='alert(1)'>Hello</p>",
      name: "name",
    });

    console.log("POST malicious html /api/sources: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).not.toBeNull();
  });

  test(`PUT /api/sources/:id`, async () => {
    if (!id) return console.log("Skipping update test — id is empty");

    const res = await api.put(`/api/sources/${id}`).set("Cookie", cookie).send({
      id: id,
      source: "updated_source",
      name: "updated_name",
    });

    console.log("PUT /api/sources: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  test(`DELETE /api/sources/:id`, async () => {
    if (!id) return console.log("Skipping delete test — id is empty");

    const res = await api.delete(`/api/sources/${id}`).set("Cookie", cookie);

    console.log("DELETE /api/sources: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  afterAll(() => {});
});
