import supertest from "supertest";
import app from "../app";
import { addToCollection } from "../shared/database";

const request = supertest(app);
jest.mock("../shared/database");

describe("GET /schedule", () => {
  describe("given pilot exist, available, has no conflicting flights", () => {
    test("flight is scheduled successfully", async () => {
      addToCollection.mockReturnValue(true);

      const response = await request
        .post(`/schedule`)
        .set("Accept", "application/json")
        .send({
          pilotID: 101,
          depDateTime: "2020-05-01T09:00:00Z",
          returnDateTime: "2020-05-01T11:00:00Z",
        });

      expect(response.status).toBe(201);
    });
  });
});
