import supertest from "supertest";
import app from "../app";
import queryStringBuilder from "query-string";
import { getCrewFromDb } from "./crewRepository";
import twoPilots from "./mockDb/twoPilots.json";

const request = supertest(app);
jest.mock("./crewRepository");

describe("returns first available pilot", () => {
  it("for a given city", async () => {
    getCrewFromDb.mockReturnValue(twoPilots);

    const queryString = queryStringBuilder.stringify({
      location: "Berlin",
    });
    const response = await request.get(`/pilot?${queryString}`);

    expect(response.body.Crew).toEqual({
      ID: 1,
      Name: "Andy",
    });
  });

  it("for a given city and days in week", async () => {
    getCrewFromDb.mockReturnValue(twoPilots);

    const queryString = queryStringBuilder.stringify({
      location: "Berlin",
    });
    const response = await request.get(`/pilot?${queryString}`);

    expect(response.body.Crew).toEqual({
      ID: 1,
      Name: "Andy",
    });
  });
});
