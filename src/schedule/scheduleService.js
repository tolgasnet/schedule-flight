import { getScheduleFromDb, addScheduleToDb } from "./scheduleRepository";
import logger from "../logger";
const log = logger("scheduleService");

export const getSchedule = () => {
  const schedule = getScheduleFromDb();
  log.debug("Found %d scheduled flights", schedule.length);

  return schedule;
};

export const addSchedule = (scheduleRecord) => {
  return addScheduleToDb(scheduleRecord);
};
