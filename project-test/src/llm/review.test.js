const request = require("supertest");
const { CONFIG } = require("../../config");

const api = request(CONFIG.LLM.API_URL);

describe("GENERATE REVIEW Test Scenario", () => {
  jest.setTimeout(30000); // 30 seconds timeout

  test("POST GENERATE REVIEW", async () => {
    const context =
      "Perhaps the ant's greatest strength is their numbers; however their greatest weakness is water.";

    const question = "What is the ant's greatest weakness?";
    const answer = "Water.";

    const res = await api
      .post("/api")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        input: { context, question, answer },
        feature: "GENERATE_REVIEW",
      });

    console.log("POST GENERATE REVIEW ", JSON.stringify(res.body, null, 2));

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.data).toHaveProperty("verdict");
    expect(res.body.data).toHaveProperty("reason");
    expect(res.body.error).toBeNull();
  });

  afterAll(() => {});
});
