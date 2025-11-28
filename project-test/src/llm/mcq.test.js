const request = require("supertest");
const { CONFIG } = require("../../config");

const api = request(CONFIG.LLM.API_URL);

describe("MCQ Test Scenario", () => {
  jest.setTimeout(30000);

  test("POST /mcq", async () => {
    const context =
      "Perhaps the ant's greatest strength is their numbers; however their greatest weakness is water.";

    const res = await api.post("/api").send({
      input: { context: context },
      feature: "GENERATE_MCQ"
    });

    // Example expected response structure:
    // {
    //   "data": {
    //       "question": "...",
    //       "correct_answer": "...",
    //       "choices": ["...", "...", "..."]
    //   },
    //   "error": null
    // }

    console.log("POST /mcq ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expect(res.body.data).toHaveProperty("question");
    expect(res.body.data).toHaveProperty("correct_answer");
    expect(res.body.data).toHaveProperty("choices");

    expect(typeof res.body.data.question).toBe("string");
    expect(typeof res.body.data.correct_answer).toBe("string");
    expect(Array.isArray(res.body.data.choices)).toBe(true);
  });

  afterAll(() => {});
});
