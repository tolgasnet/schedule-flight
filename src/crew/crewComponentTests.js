import supertest from "supertest";
import app from "../app";
import queryStringBuilder from "query-string";
import { getCrewFromDb } from "./crewRepository";
import { getScheduleFromDb } from "../schedule/scheduleRepository";
import mockEveryDay from "./mockData/mockEveryDay.json";
import mockCertainDays from "./mockData/mockCertainDays.json";
import mockSomeSchedules from "../schedule/mockData/mockSomeSchedules.json";
import mockNoSchedules from "../schedule/mockData/mockNoSchedules.json";

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
    test("and pilots work only certain days", async () => {
      getCrewFromDb.mockReturnValue(mockCertainDays);
      getScheduleFromDb.mockReturnValue(mockSomeSchedules);

      const queryString = queryStringBuilder.stringify({
        location: "Berlin",
        depDateTime: "2020-07-24T09:00:00Z",
        returnDateTime: "2020-07-26T11:00:00Z",
      });
      const response = await request.get(`/pilot?${queryString}`);

      expect(response.body.Crew).toEqual({
        ID: 3,
        Name: "David",
      });
    });

    test("and requests are distributed to the less busy pilots first", async () => {
      const pilot1Flight = {
        PilotID: 1,
        DepDateTime: "2019-05-01T09:00:00Z",
        ReturnDateTime: "2019-05-01T11:00:00Z",
      };

      const pilot2Flight = {
        PilotID: 2,
        DepDateTime: "2019-05-01T09:00:00Z",
        ReturnDateTime: "2019-05-01T11:00:00Z",
      };

      getScheduleFromDb.mockReturnValue([
        pilot1Flight,
        pilot1Flight,
        pilot2Flight,
      ]);
      getCrewFromDb.mockReturnValue(mockEveryDay);

      const queryString = queryStringBuilder.stringify({
        location: "Berlin",
        depDateTime: "2020-07-24T09:00:00Z",
        returnDateTime: "2020-07-24T11:00:00Z",
      });
      const response = await request.get(`/pilot?${queryString}`);

      expect(response.body.Crew).toEqual({
        ID: 2,
        Name: "Betty",
      });
    });
  });
});
