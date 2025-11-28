const request = require("supertest");
const { CONFIG } = require("../../config");
const { isObjectValid, isPaginationValid } = require("./utils/utils");

const api = request(CONFIG.BACKEND.API_URL);

let cookie = "";
let id = "";

const expectItem = (obj) => {
  const properties = ["id", "question_id", "answer", "review", "user_id"];
  const valid = isObjectValid(obj, properties);
  expect(valid).toBe(true);
};

describe("API writing_answers Test Scenario", () => {
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

  test("GET /api/writing_answers", async () => {
    const res = await api.get("/api/writing_answers").set("Cookie", cookie);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach(expectItem);

    expect(isPaginationValid(res.body)).toBe(true);
  });

  test("POST /api/writing_answers", async () => {
    const res = await api.post("/api/writing_answers").set("Cookie", cookie).send({
      id: "",
      question_id: "current_question_id",
      answer: "current_answer",
      review: "current_review",
    });

    console.log("POST /api/writing_answers: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    const data = res.body.data;
    expectItem(data); //If this fail then this test will exit (id wouldn't be set)
    id = data.id;
    console.log("Created id received: " + id);
  });

  test(`PUT /api/writing_answers/:id`, async () => {
    if (!id) return console.log("Skipping update test — id is empty");

    const res = await api.put(`/api/writing_answers/${id}`).set("Cookie", cookie).send({
      id: id,
      question_id: "updated_question_id",
      answer: "updated_answer",
      review: "updated_review",
    });

    console.log("PUT /api/writing_answers: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  test(`DELETE /api/writing_answers/:id`, async () => {
    if (!id) return console.log("Skipping delete test — id is empty");

    const res = await api.delete(`/api/writing_answers/${id}`).set("Cookie", cookie);

    console.log("DELETE /api/writing_answers: ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
  });

  afterAll(() => {});
});
