import { getCrew } from "./crewService";
import moment from "moment";
import logger from "../logger";
const log = logger("crewController");

export const getAvailablePilot = (req, res) => {
  const query = req.query;
  log.debug("GET /pilot with query values: %o", query);

  const departureUtc = moment.utc(query.depDateTime);
  const returnDateUtc = moment.utc(query.returnDateTime);

  const crew = getCrew(query.location, departureUtc, returnDateUtc);
  log.debug("Got results from service: %o", crew);

  res.json({
    Crew: crew,
  });
};
