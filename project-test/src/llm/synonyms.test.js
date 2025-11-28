const request = require("supertest");
const { CONFIG } = require("../../config");
const { getRandomUUID } = require("./utils/getRandomUUID");

const api = request(CONFIG.LLM.API_URL);

describe("SYNONYMS Test Scenario", () => {
  jest.setTimeout(30000);

  test("POST SYNONYMS", async () => {
    const word = "ugly";

    const res = await api.post("/api").send({
      input: { word: word },
      feature: "SYNONYMS",
      event_id: getRandomUUID()
    });

    // Example expected response structure:
    // {
    //   "data": []
    //   "error": null
    // }

    console.log("POST SYNONYMS ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();

    expect(Array.isArray(res.body.data)).toBe(true);
  });

  afterAll(() => {});
});
