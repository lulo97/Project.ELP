const request = require("supertest");
const { CONFIG } = require("../../config");

const api = request(CONFIG.LLM.API_URL);

describe("Fill in blanks Test Scenario", () => {
  jest.setTimeout(30000); // 30 seconds timeout

  test("POST Fill in blanks", async () => {
    const context =
      "Perhaps the ant's greatest strength is their numbers; however their greatest weakness is water.";

    const res = await api.post("/api").send({
      input: { context: context },
      feature: "FILL_IN_BLANK"
    });

    // Example expected response structure:
    // {
    //   "data": {
    //       "original_context": "...",
    //       "context": "...",
    //       "word": "..."
    //   },
    //   "error": null
    // }

    console.log("POST Fill in blanks ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expect(res.body.data).toHaveProperty("original_context");
    expect(res.body.data).toHaveProperty("context");
    expect(res.body.data).toHaveProperty("word");

    expect(typeof res.body.data.original_context).toBe("string");
    expect(typeof res.body.data.context).toBe("string");
    expect(typeof res.body.data.word).toBe("string");
  });

  afterAll(() => {});
});
