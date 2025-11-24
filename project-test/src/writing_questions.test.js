const request = require("supertest");
const { CONFIG } = require("../config");
const { isObjectValid, isPaginationValid } = require("./utils/utils");

const api = request(CONFIG.API_URL);

let cookie = "";
let id = "";

const expectItem = (obj) => {
  const properties = ["id", "question", "user_id"];
  const valid = isObjectValid(obj, properties);
  expect(valid).toBe(true);
};

describe("API writing_questions Test Scenario", () => {
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

  test("GET /api/writing_questions", async () => {
    const res = await api.get("/api/writing_questions").set("Cookie", cookie);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach(expectItem);

    expect(isPaginationValid(res.body)).toBe(true);
  });

  test("POST /api/writing_questions", async () => {
    const res = await api
      .post("/api/writing_questions")
      .set("Cookie", cookie)
      .send({
        id: "",
        question: "current_question",
      });

    console.log("POST /api/writing_questions: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    const data = res.body.data;
    expectItem(data); //If this fail then this test will exit (id wouldn't be set)
    id = data.id;
    console.log("Created id received: " + id);
  });

  test(`PUT /api/writing_questions/:id`, async () => {
    if (!id) return console.log("Skipping update test — id is empty");

    const res = await api
      .put(`/api/writing_questions/${id}`)
      .set("Cookie", cookie)
      .send({
        id: id,
        question: "updated_question",
      });

    console.log("PUT /api/writing_questions: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  test(`DELETE /api/writing_questions/:id`, async () => {
    if (!id) return console.log("Skipping delete test — id is empty");

    const res = await api
      .delete(`/api/writing_questions/${id}`)
      .set("Cookie", cookie);

    console.log("DELETE /api/writing_questions: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  afterAll(() => {});
});
