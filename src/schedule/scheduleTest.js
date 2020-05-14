import supertest from "supertest";
import app from "../app";

describe("GET /schedules", () => {
  it("responds with 200", (done) => {
    supertest(app).get("/schedules").expect(200, done);
  });
});
