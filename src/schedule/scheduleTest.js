import supertest from "supertest";
import app from "../app";

const request = supertest(app);

describe("GET /schedules", () => {
  it("responds with 200", async () => {
    const response = await request.get("/schedules");
    expect(response.status).toBe(200);
  });
});
