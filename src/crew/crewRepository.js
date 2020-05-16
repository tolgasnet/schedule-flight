import { getCollection } from "../shared/database";

export const getCrewFromDb = () => {
  return getCollection("Crew");
};
