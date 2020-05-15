import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("src/crew/db/crewDb.json");
const db = low(adapter);

export const getCrewFromDb = (location) => {
  const data = db.get("Crew");
  return data.find({ Base: location }).Crew;
};
