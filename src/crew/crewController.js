import { getCrew } from "./crewService";
import moment from "moment";
import queryStringBuilder from "query-string";
import logger from "../logger";
const log = logger("crewController");

// TODO:
// 1. try/catch blocks
// 2. request validation
// 3. more unit tests
// 4. readme doc
// 5. test coverage
// 6. handle edge cases
// 7. config file
// a lot more...
export const getAvailablePilot = (req, res) => {
  const query = req.query;
  const queryString = queryStringBuilder.stringify(query);
  log.info("Request: GET /pilot?%s", queryString);

  const departureUtc = moment.utc(query.depDateTime);
  const returnDateUtc = moment.utc(query.returnDateTime);

  const crew = getCrew(query.location, departureUtc, returnDateUtc);
  log.debug("Response: GET /pilot %o", crew);

  res.json({
    Crew: crew,
  });
};
