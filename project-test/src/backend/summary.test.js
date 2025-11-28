const request = require("supertest");
const { CONFIG } = require("../../config");

const api = request(CONFIG.BACKEND.API_URL);

describe("SUMMARY Test Scenario", () => {
  jest.setTimeout(30000); // 30 seconds timeout

  test("POST SUMMARY", async () => {
    const context =
      "Ants are incredibly strong, capable of lifting 20 to 50 times their own body weight, and can be found on every continent except Antarctica. They use chemical trails called pheromones to communicate and navigate, and some species can even swim or form floating rafts to survive floods. Additionally, ants have been around since the age of dinosaurs, and some queen ants can live for many years.";

    const res = await api.post("/api/ai").send({
      input: { context: context },
      feature: "SUMMARY",
    });

    // Example expected response structure:
    // {
    //   "data": "..."
    //   "error": null
    // }

    console.log("POST SUMMARY ", res.body);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBeNull();
  });

  afterAll(() => {});
});
