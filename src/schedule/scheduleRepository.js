import { getCollection } from "../shared/database";

export const getScheduleFromDb = () => {
  return getCollection("Schedule");
};
