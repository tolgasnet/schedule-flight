import { getScheduleFromDb, addScheduleToDb } from "./scheduleRepository";
import { getCrewFromDb } from "../crew/crewRepository";
import logger from "../logger";
const log = logger("scheduleService");

export const getSchedule = () => {
  const schedule = getScheduleFromDb();
  log.debug("Found %d scheduled flights", schedule.length);

  return schedule;
};

export const addSchedule = (scheduleRecord) => {
  const allCrew = getCrewFromDb();

  if (!doesPilotExist(allCrew, scheduleRecord)) {
    log.debug("Could not find pilotID: %d", scheduleRecord.pilotID);
    return false;
  }

  return addScheduleToDb(scheduleRecord);
};

const doesPilotExist = (allCrew, scheduleRecord) => {
  return (
    allCrew.filter((pilot) => pilot.ID === scheduleRecord.pilotID).length > 0
  );
};
