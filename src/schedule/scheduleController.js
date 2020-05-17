import { addSchedule } from "./scheduleService";
import logger from "../logger";
const log = logger("scheduleController");

// TODO:
// 1. try/catch blocks
// 2. request validation
// 3. more unit tests
// 4. readme doc
// 5. test coverage
// 6. handle edge cases
// 7. config file
// a lot more...
export const postSchedule = (req, res) => {
  try {
    const request = req.body;

    log.debug("POST /schedule %o", request);

    const pilotID = request.pilotID;
    const departureUtc = request.depDateTime;
    const returnUtc = request.returnDateTime;

    const success = addSchedule({ pilotID, departureUtc, returnUtc });

    res.status(success ? 201 : 422).send();
  } catch (err) {
    log.error(err.stack);
    res.status(500).send();
  }
};
