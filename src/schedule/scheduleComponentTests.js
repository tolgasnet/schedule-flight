import supertest from "supertest";
import app from "../app";
import { addScheduleToDb, getScheduleFromDb } from "./scheduleRepository";
import { getCrewFromDb } from "../crew/crewRepository";

const request = supertest(app);
jest.mock("../crew/crewRepository");
jest.mock("./scheduleRepository");

describe("GET /schedule", () => {
  beforeEach(() => {
    addScheduleToDb.mockReset();
    getScheduleFromDb.mockReset();
    getCrewFromDb.mockReset();
  });

  describe("flight is scheduled successfully", () => {
    test("given pilot exist, available, has no conflicting flights", async () => {
      addScheduleToDb.mockReturnValue(true);
      getCrewFromDb.mockReturnValue([{ ID: 101 }]);

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

  describe("flight isn't scheduled", () => {
    test("given pilot doesn't exist", async () => {
      // addScheduleToDb.mockReturnValue();
      getCrewFromDb.mockReturnValue([{ pilot: 0 }]);

      const response = await request
        .post(`/schedule`)
        .set("Accept", "application/json")
        .send({
          pilotID: 101,
          depDateTime: "2020-05-01T09:00:00Z",
          returnDateTime: "2020-05-01T11:00:00Z",
        });

      expect(response.status).toBe(422);
      expect(addScheduleToDb).toHaveBeenCalledTimes(0);
    });
  });
});
