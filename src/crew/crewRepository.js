import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("crewDb.json");
const db = low(adapter);

export const getCrewFromDb = (location) => {
  return db.get("Crew").find({ Base: location }).Crew;
};
