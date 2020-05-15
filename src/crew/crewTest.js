import supertest from "supertest";
import app from "../app";
import queryStringBuilder from "query-string";
import { getCrewFromDb } from "./crewRepository";
import twoPilots from "./mockDb/twoPilots.json";
import twoPilotsDifferentDays from "./mockDb/twoPilotsDifferentDays.json";

const request = supertest(app);
jest.mock("./crewRepository");

describe("GET /pilot", () => {
  describe("when there are no scheduled flights", () => {
    test("and pilots work everyday", async () => {
      getCrewFromDb.mockReturnValue(twoPilots);

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
      getCrewFromDb.mockReturnValue(twoPilotsDifferentDays);

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
