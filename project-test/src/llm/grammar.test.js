const request = require("supertest");
const { CONFIG } = require("../../config");

const api = request(CONFIG.LLM.API_URL);

describe("GRAMMAR Test Scenario", () => {
  jest.setTimeout(30000); // 30 seconds timeout

  test("POST GRAMMAR", async () => {
    const text = "He are a boy";

    const res = await api
      .post("/api")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        input: { text },
        feature: "GRAMMAR",
      });

    console.log("POST GRAMMAR ", JSON.stringify(res.body));

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();
  });

  afterAll(() => {});
});
