const request = require("supertest");
const { CONFIG } = require("../config");
const { isObjectValid, isPaginationValid } = require("./utils/utils");

const api = request(CONFIG.API_URL);

let cookie = "";
let id = "";

const expectItem = (obj) => {
  const properties = ["id", "phrase", "meaning", "example", "user_id"];
  const valid = isObjectValid(obj, properties);
  expect(valid).toBe(true);
};

describe("API phrases Test Scenario", () => {
  test("POST /api/auth/login", async () => {
    const res = await api
      .post("/api/auth/login")
      .send({ username: CONFIG.USERNAME, password: CONFIG.PASSWORD });

    console.log("POST /api/auth/login: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    cookie = res.headers["set-cookie"].map((c) => c.split(";")[0]).join("; ");

    expect(cookie).toBeDefined();

    console.log("Cookie received: " + cookie);
  });

  test("GET /api/phrases", async () => {
    const res = await api.get("/api/phrases").set("Cookie", cookie);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach(expectItem);

    expect(isPaginationValid(res.body)).toBe(true);
  });

  test("POST /api/phrases", async () => {
    const res = await api
      .post("/api/phrases")
      .set("Cookie", cookie)
      .send({
        id: "",
        phrase: "current_phrase",
        meaning: "meaning",
        example: "example",
      });

    console.log("POST /api/phrases: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    const data = res.body.data;
    expectItem(data); //If this fail then this test will exit (id wouldn't be set)
    id = data.id;
    console.log("Created id received: " + id);
  });

  test(`PUT /api/phrases/:id`, async () => {
    if (!id) return console.log("Skipping update test — id is empty");

    const res = await api
      .put(`/api/phrases/${id}`)
      .set("Cookie", cookie)
      .send({
        id: id,
        phrase: "updated_phrase",
        meaning: "updated_meaning",
        example: "updated_example",
      });

    console.log("PUT /api/phrases: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  test(`DELETE /api/phrases/:id`, async () => {
    if (!id) return console.log("Skipping delete test — id is empty");

    const res = await api.delete(`/api/phrases/${id}`).set("Cookie", cookie);

    console.log("DELETE /api/phrases: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  afterAll(() => {});
});
