const request = require("supertest");
const { CONFIG } = require("../../config");

const api = request(CONFIG.BACKEND.API_URL);

describe("GENERATE QUESTION Test Scenario", () => {
  jest.setTimeout(30000); // 30 seconds timeout

  test("POST GENERATE QUESTION", async () => {
    const context = "Perhaps the ant's greatest strength is their numbers; however their greatest weakness is water.";

    const res = await api
      .post("/api/ai")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        input: { context },
        feature: "GENERATE_QUESTION",
      });

    console.log("POST GENERATE QUESTION ", JSON.stringify(res.body));

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.data).toHaveProperty("question");
    expect(res.body.data).toHaveProperty("answer");
    expect(res.body.error).toBeNull();
  });

  afterAll(() => {});
});
