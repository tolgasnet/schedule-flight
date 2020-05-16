import { addSchedule } from "./scheduleService";
import logger from "../logger";
const log = logger("scheduleController");

export const postSchedule = (req, res) => {
  const request = req.body;

  log.debug("POST /schedule %o", request);

  const pilotID = request.pilotID;
  const departureUtc = request.depDateTime;
  const returnUtc = request.returnDateTime;

  const success = addSchedule({ pilotID, departureUtc, returnUtc });

  res.status(success ? 201 : 500).send();
};
