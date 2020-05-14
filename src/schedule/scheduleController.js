import logger from "../logger";
const log = logger("scheduleController");

export const getSchedules = (req, res) => {
  log.debug("GET /getSchedules");
  res.send("Hello World!");
};
