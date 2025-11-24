const request = require("supertest");
const { CONFIG } = require("../config");
const { isObjectValid, isPaginationValid } = require("./utils/utils");

const api = request(CONFIG.API_URL);

let cookie = "";
let id = "";

const expectItem = (obj) => {
  const properties = ["id", "word", "synonym", "note", "user_id"];
  const valid = isObjectValid(obj, properties);
  expect(valid).toBe(true);
};

describe("API synonyms Test Scenario", () => {
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

  test("GET /api/synonyms", async () => {
    const res = await api.get("/api/synonyms").set("Cookie", cookie);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach(expectItem);

    expect(isPaginationValid(res.body)).toBe(true);
  });

  test("POST /api/synonyms", async () => {
    const res = await api.post("/api/synonyms").set("Cookie", cookie).send({
      id: "",
      word: "current_word", 
      synonym: "current_synonym", 
      note: "current_note"
    });

    console.log("POST /api/synonyms: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    const data = res.body.data;
    expectItem(data); //If this fail then this test will exit (id wouldn't be set)
    id = data.id;
    console.log("Created id received: " + id);
  });

  test(`PUT /api/synonyms/:id`, async () => {
    if (!id) return console.log("Skipping update test — id is empty");

    const res = await api.put(`/api/synonyms/${id}`).set("Cookie", cookie).send({
      id: id,
      word: "updated_word", 
      synonym: "updated_synonym", 
      note: "updated_note"
    });

    console.log("PUT /api/synonyms: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  test(`DELETE /api/synonyms/:id`, async () => {
    if (!id) return console.log("Skipping delete test — id is empty");

    const res = await api.delete(`/api/synonyms/${id}`).set("Cookie", cookie);

    console.log("DELETE /api/synonyms: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  afterAll(() => {});
});
