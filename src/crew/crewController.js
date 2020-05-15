import { getCrew } from "./crewService";
import logger from "../logger";
const log = logger("crewController");

export const getAvailablePilot = (req, res) => {
  log.debug("GET /pilot with query values: %o", req.query);

  const crew = getCrew(req.query.location);
  log.debug("Got results from service: %o", crew);

  res.json({
    Crew: crew,
  });
};
