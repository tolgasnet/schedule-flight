import supertest from "supertest";
import app from "../app";
import { addScheduleToDb, getScheduleFromDb } from "./scheduleRepository";
import { getCrewFromDb } from "../crew/crewRepository";
import mockNoSchedules from "./mockData/mockNoSchedules.json";

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
    test("given pilot available, has no conflicting flights", async () => {
      addScheduleToDb.mockReturnValue(true);
      getCrewFromDb.mockReturnValue([{ ID: 101, WorkDays: ["Friday"] }]);
      getScheduleFromDb.mockReturnValue(mockNoSchedules);

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
      getCrewFromDb.mockReturnValue([]);
      getScheduleFromDb.mockReturnValue(mockNoSchedules);

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

    test("given pilot is not working on the day", async () => {
      getCrewFromDb.mockReturnValue([{ ID: 101, WorkDays: ["Monday"] }]);
      getScheduleFromDb.mockReturnValue(mockNoSchedules);

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

    test("given pilot has conflicting schedule", async () => {
      getCrewFromDb.mockReturnValue([{ ID: 101, WorkDays: ["Friday"] }]);
      getScheduleFromDb.mockReturnValue([
        {
          PilotID: 101,
          DepDateTime: "2020-05-01T09:00:00Z",
          ReturnDateTime: "2020-05-01T11:00:00Z",
        },
      ]);

      const response = await request
        .post(`/schedule`)
        .set("Accept", "application/json")
        .send({
          pilotID: 101,
          depDateTime: "2020-05-01T10:00:00Z",
          returnDateTime: "2020-05-01T11:00:00Z",
        });

      expect(response.status).toBe(422);
      expect(addScheduleToDb).toHaveBeenCalledTimes(0);
    });
  });
});
