import { getCollection } from "../shared/database";

export const getCrewFromDb = (location) => {
  var collection = getCollection("Crew");

  return collection.filter((record) => {
    record.Base === location;
  });
};
