const request = require("supertest");
const { CONFIG } = require("../../config");
const { isObjectValid, isPaginationValid } = require("./utils/utils");

const api = request(CONFIG.BACKEND.API_URL);

let cookie = "";
let id = "";

const expectItem = (obj) => {
  const properties = ["id", "word", "user_id"];
  const valid = isObjectValid(obj, properties);
  expect(valid).toBe(true);
};

describe("API Words Test Scenario", () => {
  test("POST /api/auth/login", async () => {
    const res = await api
      .post("/api/auth/login")
      .send({ username: CONFIG.BACKEND.USERNAME, password: CONFIG.BACKEND.PASSWORD });

    console.log("POST /api/auth/login: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    cookie = res.headers["set-cookie"].map((c) => c.split(";")[0]).join("; ");

    expect(cookie).toBeDefined();

    console.log("Cookie received: " + cookie);
  });

  test("GET /api/words", async () => {
    const res = await api.get("/api/words").set("Cookie", cookie);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach(expectItem);

    expect(isPaginationValid(res.body)).toBe(true);
  });

  test("POST /api/words", async () => {
    const res = await api
      .post("/api/words")
      .set("Cookie", cookie)
      .send({ id: "", word: "new_word" });

    console.log("POST /api/words: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    const data = res.body.data;
    expectItem(data);
    id = data.id;
    console.log("Created id received: " + id);
  });

  test(`PUT /api/words/:id`, async () => {
    if (!id) return console.log("Skipping update test — id is empty");

    const res = await api
      .put(`/api/words/${id}`)
      .set("Cookie", cookie)
      .send({ id, word: "updated_word" });

    console.log("PUT /api/words: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  test(`DELETE /api/words/:id`, async () => {
    if (!id) return console.log("Skipping delete test — id is empty");

    const res = await api.delete(`/api/words/${id}`).set("Cookie", cookie);

    console.log("DELETE /api/words: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  afterAll(() => {});
});
