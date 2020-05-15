import supertest from "supertest";
import app from "../app";
import queryStringBuilder from "query-string";
import { getCrewFromDb } from "./crewRepository";
import { getScheduleFromDb } from "../schedule/scheduleRepository";
import mockEveryDay from "./mockDb/mockEveryDay.json";
import mockCertainDays from "./mockDb/mockCertainDays.json";
import mockOneAvailableSchedule from "./mockDb/mockOneAvailableSchedule.json";
import mockNoSchedules from "./mockDb/mockNoSchedules.json";

const request = supertest(app);
jest.mock("./crewRepository");
jest.mock("../schedule/scheduleRepository");

describe("GET /pilot", () => {
  describe("no scheduled flights", () => {
    test("and pilots work everyday", async () => {
      getCrewFromDb.mockReturnValue(mockEveryDay);
      getScheduleFromDb.mockReturnValue(mockNoSchedules);

      const queryString = queryStringBuilder.stringify({
        location: "Berlin",
        depDateTime: "2020-06-24T09:00:00Z",
        returnDateTime: "2020-07-25T11:00:00Z",
      });
      const response = await request.get(`/pilot?${queryString}`);

      expect(response.body.Crew).toEqual({
        ID: 1,
        Name: "Andy",
      });
    });

    test("and pilots work certain days", async () => {
      getCrewFromDb.mockReturnValue(mockCertainDays);
      getScheduleFromDb.mockReturnValue(mockNoSchedules);

      const queryString = queryStringBuilder.stringify({
        location: "Berlin",
        depDateTime: "2020-07-24T09:00:00Z",
        returnDateTime: "2020-07-26T11:00:00Z",
      });
      const response = await request.get(`/pilot?${queryString}`);

      expect(response.body.Crew).toEqual({
        ID: 2,
        Name: "Betty",
      });
    });
  });

  describe("there are previously scheduled flights", () => {
    test("and pilots work certain days", async () => {
      getCrewFromDb.mockReturnValue(mockCertainDays);
      getScheduleFromDb.mockReturnValue(mockOneAvailableSchedule);

      const queryString = queryStringBuilder.stringify({
        location: "Berlin",
        depDateTime: "2020-07-24T09:00:00Z",
        returnDateTime: "2020-07-26T11:00:00Z",
      });
      const response = await request.get(`/pilot?${queryString}`);

      expect(response.body.Crew).toEqual({
        ID: 2,
        Name: "Betty",
      });
    });
  });
});
