const request = require("supertest");
const { CONFIG } = require("../../config");
const { isObjectValid, isPaginationValid } = require("./utils/utils");

const api = request(CONFIG.BACKEND.API_URL);

let cookie = "";
let id = "";

const expectItem = (obj) => {
  const properties = ["id", "speaking_id", "score", "text_listened", "text"];
  const valid = isObjectValid(obj, properties);
  expect(valid).toBe(true);
};

describe("API speaking_scores Test Scenario", () => {
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

  test("GET /api/speaking_scores", async () => {
    const res = await api.get("/api/speaking_scores").set("Cookie", cookie);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach(expectItem);

    expect(isPaginationValid(res.body)).toBe(true);
  });

  test("POST /api/speaking_scores", async () => {
    const res = await api.post("/api/speaking_scores").set("Cookie", cookie).send({
      id: "",
      speaking_id: "current_speaking_id", 
      score: "100", 
      text_listened: "current_text_listened", 
      text: "current_text"
    });

    console.log("POST /api/speaking_scores: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    const data = res.body.data;
    expectItem(data); //If this fail then this test will exit (id wouldn't be set)
    id = data.id;
    console.log("Created id received: " + id);
  });

  test(`PUT /api/speaking_scores/:id`, async () => {
    if (!id) return console.log("Skipping update test — id is empty");

    const res = await api.put(`/api/speaking_scores/${id}`).set("Cookie", cookie).send({
      id: id,
      speaking_id: "updated_speaking_id", 
      score: "99", 
      text_listened: "updated_text_listened", 
      text: "updated_text"
    });

    console.log("PUT /api/speaking_scores: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  test(`DELETE /api/speaking_scores/:id`, async () => {
    if (!id) return console.log("Skipping delete test — id is empty");

    const res = await api.delete(`/api/speaking_scores/${id}`).set("Cookie", cookie);

    console.log("DELETE /api/speaking_scores: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  afterAll(() => {});
});
