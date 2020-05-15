import { getScheduleFromDb } from "./scheduleRepository";
import logger from "../logger";
const log = logger("scheduleService");

export const getSchedule = () => {
  const schedule = getScheduleFromDb();
  log.debug("Found %d scheduled flights", schedule.length);

  return schedule;
};
