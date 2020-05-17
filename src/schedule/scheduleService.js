import { getScheduleFromDb, addScheduleToDb } from "./scheduleRepository";
import { getCrewFromDb } from "../crew/crewRepository";
import { getDaysOfWeek } from "../shared/date";
import { Pilot } from "../crew/pilot";
import logger from "../logger";
const log = logger("scheduleService");

export const getSchedule = () => {
  const schedule = getScheduleFromDb();
  log.debug("Found %d scheduled flights", schedule.length);

  return schedule;
};

export const addSchedule = (scheduleRecord) => {
  const requestedDays = getDaysOfWeek(
    scheduleRecord.departureUtc,
    scheduleRecord.returnUtc,
  );
  const schedule = getScheduleFromDb();
  const pilotData = getCrewFromDb().filter(
    (c) => c.ID == scheduleRecord.pilotID,
  );

  if (pilotData.length === 0) {
    return false;
  }

  const pilot = new Pilot(pilotData[0], schedule);
  const isAvailable = pilot.isAvailable(
    requestedDays,
    scheduleRecord.departureUtc,
    scheduleRecord.returnUtc,
  );

  if (!isAvailable) {
    return false;
  }

  return addScheduleToDb(scheduleRecord);
};
