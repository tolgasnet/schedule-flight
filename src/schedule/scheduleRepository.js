import { getCollection, addToCollection } from "../shared/database";

export const getScheduleFromDb = () => {
  return getCollection("Schedule");
};

export const addScheduleToDb = (scheduleRecord) => {
  return addToCollection("Schedule", {
    PilotID: scheduleRecord.pilotID,
    DepDateTime: scheduleRecord.departureUtc,
    ReturnDateTime: scheduleRecord.returnUtc,
  });
};
